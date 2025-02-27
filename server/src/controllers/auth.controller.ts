import User from "../models/user.model";
import TempUser from "../models/tempUser.model";
import asyncHandler from "../utils/asyncHandler";
import { ApiError } from "../utils/customErrorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import ResponseHandler from "../utils/responseHandler";
import Otp from "../models/otp.model";
import nodemailer from "nodemailer";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { generateFromEmail } from "unique-username-generator";
import { AuthenticatedRequest } from "../types/auth.types";

interface SMTPConfig {
  service?: string;
  host?: string;
  port?: number;
  secure?: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

const smtpConfig: SMTPConfig = {
  service: process.env.SMTP_SERVICE,
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: Boolean(process.env.SMTP_SECURE),
  auth: {
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASSWORD!,
  },
};
//configure transporter
const transporter = nodemailer.createTransport(smtpConfig);

//access token refresh token generating utility method
const generateTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Access token, Refresh token generating failed !");
  }
};

//send email for verification
const sendEmailVerificationOTP = async ({ _id, email }) => {
  try {
    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("OTP:", otp);
    const expiresAt = Date.now() + 10 * 60 * 1000;

    // Save OTP in the database
    await Otp.create({
      userId: _id,
      otp,
      expiresAt,
    });

    // Email content
    const mailOptions = {
      from: `"Chat Application" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Chat Application OTP",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Your Verification Code</h2>
          <p style="font-size: 16px;">Use the following OTP to verify your email:</p>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 5px; text-align: center;">
            <strong style="font-size: 24px; letter-spacing: 2px;">${otp}</strong>
          </div>
          <p style="font-size: 14px; color: #6b7280; margin-top: 20px;">
            This OTP will expire in 10 minutes.
          </p>
        </div>
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);

    return "OTP sent successfully! Please verify your email!";
  } catch (error) {
    console.error("Email sending error:", error);

    // Handle specific Nodemailer errors
    if (error.code === "ECONNECTION") {
      throw new ApiError(500, "Failed to connect to email server");
    }

    if (error.code === "EAUTH") {
      throw new ApiError(500, "Authentication failed for email service");
    }

    throw new ApiError(500, "Something went wrong! Resend OTP!");
  }
};

//register user
export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    //checking if any field is unfilled
    if (!name || !email || !password) {
      throw new ApiError(400, "All fields are required !");
    }

    //checking if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(409, "User already exists");
    }

    //storing user's info without verifying email
    const user = await TempUser.create({
      name,
      email,
      password,
    });

    const message = await sendEmailVerificationOTP({ _id: user._id, email });
    if (!message) {
      throw new ApiError(500, "Something went wrong! Please try again!");
    }

    return res.status(200).json(
      new ResponseHandler(201, message, {
        _id: user._id,
      })
    );
  }
);

//verify email otp
export const verifyEmailOTP = asyncHandler(
  async (req: Request, res: Response) => {
    const { _id, inputOTP } = req.body;
    console.log(_id);
    try {
      if (!_id || !inputOTP) {
        throw new ApiError(500, "All fields are required !");
      }

      const otpDetails = await Otp.findOne({ userId: _id });
      // console.log(otpDetails);
      if (!otpDetails) {
        throw new ApiError(404, "Invalid OTP or email !");
      }

      // checking if given OTP is valid
      const isOTPValid = await bcrypt.compare(inputOTP, otpDetails.otp);
      // console.log(isOTPValid);
      if (!isOTPValid) {
        throw new ApiError(409, "Invalid OTP !");
      }

      // Check if the OTP has expired
      if (otpDetails.expiresAt.getTime() < Date.now()) {
        throw new ApiError(409, "OTP has expired !");
      }

      await Otp.deleteOne({ userId: _id });

      const user = await TempUser.findById(_id);
      const username = generateFromEmail(user.email, 3);

      //storing user's info after verifying email
      const newUser = await User.create({
        name: user.name,
        email: user.email,
        password: user.password,
        username,
      });

      // delete the user from tempUser
      await TempUser.deleteMany({ _id: user._id });

      return res.status(200).json(
        new ResponseHandler(201, "OTP Verified successfully !", {
          _id: newUser._id,
          email: newUser.email,
          name: newUser.name,
          username: newUser.username,
        })
      );
    } catch (error) {
      throw new ApiError(
        500,
        "Something went wrong ! Email OTP Verification failed !"
      );
    }
  }
);

//login user
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  //checking if any field is unfilled
  if (!email || !password) {
    throw new ApiError(400, "All fields are required !");
  }

  //checking if the user exists or not
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(409, "User not exists ! Please create an account !");
  }

  //checking if given password is valid
  const isPasswordValid = await user.isValidPassword(password);
  if (!isPasswordValid) {
    throw new ApiError(409, "Invalid user login credentials");
  }

  //generate tokens
  const { accessToken, refreshToken } = await generateTokens(user._id);

  //fetching logged in user
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  //configuring cookie options
  const options = {
    httpOnly: true,
    secure: false,
    expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ResponseHandler(201, "User logged in successfully", {
        user: loggedInUser,
        token: accessToken,
      })
    );
});

//logout user
export const logoutUser = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $unset: {
          refreshToken: 1,
        },
      },
      {
        new: true,
      }
    );

    const options = {
      httpOnly: true,
      secure: false,
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ResponseHandler(200, "User logged Out", {}));
  }
);

//refresh access token
export const refreshAccessToken = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const incomingRefreshToken =
        req.cookies?.refreshToken || req.body.refreshToken;

      if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request");
      }

      //verifiying token
      const decodedToken = jwt.verify(
        incomingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET
      ) as JwtPayload;

      //finding user
      const user = await User.findById(decodedToken?._id);

      //checking if user exists
      if (!user) {
        throw new ApiError(401, "Access token not found");
      }

      //checking if both refresh token matches
      if (incomingRefreshToken !== user.refreshToken) {
        throw new ApiError(401, "Invalid access token");
      }

      //generate new tokens
      const { accessToken, refreshToken } = await generateTokens(user._id);

      const options = {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
      };

      return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ResponseHandler(201, "Access token refreshed successfully"));
    } catch (error) {
      throw new ApiError(401, error?.message || "Invalid refresh token");
    }
  }
);

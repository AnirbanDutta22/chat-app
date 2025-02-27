import User from "../models/user.model";
import asyncHandler from "../utils/asyncHandler";
import { ApiError } from "../utils/customErrorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import ResponseHandler from "../utils/responseHandler";
import Otp from "../models/otp.model";
import nodemailer from "nodemailer";
import { Request, Response } from "express";

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

//send otp to email
const sendEmailVerificationOTP = async ({ _id, email }) => {
  try {
    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
    const expiresAt = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes

    // Save OTP in the database
    const newOtp = new Otp({
      userId: _id,
      userType: "user",
      otp,
      expiresAt,
    });
    await newOtp.save();

    // Send OTP via email using nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // sender email
        pass: process.env.EMAIL_PASS, // sender password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Chat Application OTP",
      html: `<p>Your OTP code is <b>${otp}</b>. It expires in 10 minutes.</p>`,
    };

    const sentMail = await transporter.sendMail(mailOptions);

    if (!sentMail) {
      throw new ApiError(500, "Failed to send OTP !");
    }

    console.log("OTP sent successfully !");
  } catch (error) {
    throw new ApiError(500, "Something went wrong ! Resend OTP !");
  }
};

//register user
export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { fullName, email, password } = req.body;

    //checking if any field is unfilled
    if (!fullName || !email || !password) {
      throw new ApiError(400, "All fields are required !");
    }

    //checking if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(409, "User already exists");
    }

    //storing user's info without verifying email
    const user = await User.create({
      fullName,
      email,
      password,
    });

    await user
      .save()
      .then((response) => {
        // console.log(response);
        sendEmailVerificationOTP({ _id: response._id, email: response.email });
        res.json({
          status: 201,
          message: "User registered successfully ! Please Verify Email !",
          response,
        });
      })
      .catch((error) => {
        res.json({
          status: 500,
          message: error?.message || "User registration failed ! Try Again !",
        });
      });
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
    throw new ApiError(409, "User not exists ! Please register !");
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
    .cookie("userAccessToken", accessToken, options)
    .cookie("userRefreshToken", refreshToken, options)
    .json(
      new ResponseHandler(201, "User logged in successfully", loggedInUser)
    );
});

//logout user
export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
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
    .clearCookie("userAccessToken", options)
    .clearCookie("userRefreshToken", options)
    .json(new ResponseHandler(200, "User logged Out", {}));
});

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

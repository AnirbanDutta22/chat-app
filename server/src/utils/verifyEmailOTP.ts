import bcrypt from "bcrypt";
import { NotFoundError, ApiError } from "./customErrorHandler";
import User from "../models/user.model";
import asyncHandler from "./asyncHandler";
import EventEmitter from "events";
import Otp from "../models/otp.model";
import ResponseHandler from "./responseHandler";
const bus = new EventEmitter();

bus.setMaxListeners(20); // Increase the limit as needed

//verify email otp
const verifyEmailOTP = asyncHandler(async (req, res) => {
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
    if (otpDetails.expiresAt.getDate() < Date.now()) {
      throw new ApiError(409, "OTP has expired !");
    }

    const { userType } = otpDetails;

    await Otp.deleteOne({ userId: _id });

    if (userType === "user") {
      const user = await User.findById(_id);
      console.log(user);
      if (!user) {
        throw new NotFoundError("User not found !");
      }

      // user.isEmailVerified = true;
      await user.save();

      return res
        .status(200)
        .json(
          new ResponseHandler(201, "Email OTP Verified successfully !", {})
        );
    }
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong ! Email OTP Verification failed !"
    );
  }
});

export default verifyEmailOTP;

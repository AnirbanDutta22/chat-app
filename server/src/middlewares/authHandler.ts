import jwt, { JwtPayload } from "jsonwebtoken";
import { ApiError } from "../utils/customErrorHandler";
import User from "../models/user.model";
import asyncHandler from "../utils/asyncHandler";
import { Request, Response, NextFunction } from "express";

const authHandler = () =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token =
        req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];

      console.log(token);

      if (!token) {
        throw new ApiError(401, "Unauthorized request! Token not found!");
      }

      //verifying token with jwt
      const decodedToken = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET
      ) as JwtPayload;
      console.log(decodedToken);

      //finding the user
      const user = await User.findById(decodedToken?._id);
      //checking if user exists
      if (!user) {
        throw new ApiError(401, "Invalid access token !");
      }

      req.user = user;

      next();
    } catch (error) {
      throw new ApiError(401, error?.message || "Invalid access token");
    }
  });

export default authHandler;

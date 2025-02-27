import { NextFunction, Request, Response } from "express";

const asyncHandler =
  (func) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next);
    } catch (error) {
      // res.status(error.statusCode || 500).json({
      //   success: false,
      //   message: error.message,
      // });
      next(error);
    }
  };

export default asyncHandler;

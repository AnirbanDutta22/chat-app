import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { ValidationError } from "../utils/customErrorHandler";
import Chat from "../models/chat.model";
import ResponseHandler from "../utils/responseHandler";
import { AuthenticatedRequest } from "../types/auth.types";

export const getAllChats = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user._id;

    if (!userId) {
      throw new ValidationError("User ID required!");
    }

    const chats = await Chat.find();

    if (!chats || chats.length === 0) {
      return res.json(new ResponseHandler(200, "No chats available!"));
    }

    return res.json(
      new ResponseHandler(200, "All chats fetched successfully!", chats)
    );
  }
);

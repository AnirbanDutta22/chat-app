import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { ValidationError } from "../utils/customErrorHandler";
import ResponseHandler from "../utils/responseHandler";
import Message from "../models/message.model";

export const getAllMessages = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user._id;
    const { chatId } = req.body;

    if (!userId || !chatId) {
      throw new ValidationError("User ID and Chat ID are required!");
    }

    const chat = await Message.find({ chat: chatId });

    if (!chat || chat.length === 0) {
      return res.json(new ResponseHandler(200, "No messages available!"));
    }

    return res.json(
      new ResponseHandler(200, "All messages fetched successfully!", chat)
    );
  }
);

export const sendMessage = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user._id;
  const { receiverId, content, attachments } = req.body;

  if (!userId || !receiverId) {
    throw new ValidationError("User ID and Receiver ID are required!");
  }

  // socket logic

  return res.json(new ResponseHandler(200, "Message sent successfully!"));
});

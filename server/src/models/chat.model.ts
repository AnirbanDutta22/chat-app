import { Document, Schema, model, Types } from "mongoose";

type ChatDocument = Document & {
  name: string;
  groupChat?: boolean;
  creator?: Types.ObjectId;
  member?: Types.ObjectId[];
};

const chatSchema = new Schema<ChatDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    groupChat: {
      type: Boolean,
      default: false,
    },
    creator: {
      type: Schema.Types.ObjectId, // Use Schema.Types.ObjectId
      ref: "User",
    },
    member: [
      {
        type: Schema.Types.ObjectId, // Use Schema.Types.ObjectId
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Chat = model<ChatDocument>("Chat", chatSchema);

export default Chat;

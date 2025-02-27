import { Schema, Types, model } from "mongoose";

type MessageDocument = Document & {
  content: string;
  sender: Types.ObjectId;
  receiver: Types.ObjectId;
  chat: Types.ObjectId;
  attachments?: {
    public_id: string;
    url: string;
  }[];
};

const messageSchema = new Schema<MessageDocument>(
  {
    content: { type: String },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    chat: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
    },
    attachments: [
      {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const Message = model<MessageDocument>("Message", messageSchema);
export default Message;

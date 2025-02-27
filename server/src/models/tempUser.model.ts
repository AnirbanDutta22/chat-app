import validator from "validator";
import { Document, Schema, model } from "mongoose";

type TempUserDocument = Document & {
  email: string;
  name: string;
  password: string;
};

const tempUserSchema = new Schema<TempUserDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Enter email"],
      validate: [validator.isEmail, "Enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Enter password"],
      minLength: [8, "Password must be of at least 8 characters"],
    },
  },
  { timestamps: true }
);

const TempUser = model<TempUserDocument>("TempUser", tempUserSchema);
export default TempUser;

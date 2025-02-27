import mongoose from "mongoose";
const Schema = mongoose.Schema;
import bcrypt from "bcrypt";

const otpSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "userType",
      required: [true, "User ID required"],
    },
    otp: {
      type: String,
      required: true,
    },
    expiresAt: Date,
  },
  { timestamps: true }
);

otpSchema.pre("save", async function (next) {
  if (!this.isModified("otp")) return next();
  this.otp = await bcrypt.hash(this.otp, 10);
  next();
});

//otp validity checking method
otpSchema.methods.isValidOTP = async function (
  otp: string | Buffer<ArrayBufferLike>
) {
  return await bcrypt.compare(otp, this.otp);
};

const Otp = mongoose.model("Otp", otpSchema);
export default Otp;

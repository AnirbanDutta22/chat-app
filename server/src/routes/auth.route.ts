import express from "express";
const router = express.Router();
import {
  loginUser,
  logoutUser,
  registerUser,
  verifyEmailOTP,
} from "../controllers/auth.controller";
import authHandler from "../middlewares/authHandler";

router.route("/signup").post(registerUser);
router.route("/verify").post(verifyEmailOTP);
router.route("/login").post(loginUser);
router.route("/user/logout").post(authHandler(), logoutUser);

export default router;

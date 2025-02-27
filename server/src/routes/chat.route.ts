import express from "express";
import { getAllChats } from "../controllers/chat.controller";
import authHandler from "../middlewares/authHandler";
const router = express.Router();

router.route("/get-all-chats").get(authHandler(), getAllChats);

export default router;

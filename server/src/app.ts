import express from "express";
import path from "path";
import cookieParser from "cookie-parser";

//internal imports
import authRouter from "./routes/auth.route";
import chatRouter from "./routes/chat.route";
import messageRouter from "./routes/message.route";

const app = express();

//request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//set view engine

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//parse cookies
app.use(cookieParser());

//set up routing
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/chat", chatRouter);
app.use("/api/v1/message", messageRouter);

//errors handler

export default app;

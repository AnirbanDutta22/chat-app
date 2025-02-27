//external imports
import dotenv from "dotenv";
dotenv.config();
//internal imports
import connectDB from "./db/config";
import app from "./app";

connectDB();
app.listen(process.env.PORT, () => {
  console.log(`app is running on ${process.env.PORT}`);
});

// connect database here
import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();
mongoose.set("strictQuery", false);
const port = 8000;
mongoose
  .connect(process.env.MONGODB_URL as string)
  .then(() => {
    app.listen(port, () => console.log(`The server is runnig on port ${port}`));
  })
  .catch((error: Error) => {
    console.log(
      `MongoDB connectin error. Please make sure MongoDB is running. ${error}`
    );
    process.exit(1);
  });

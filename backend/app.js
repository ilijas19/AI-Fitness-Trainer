//packages
import "express-async-errors";
import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
//db
import { connectDb } from "./db/connectDb.js";
//routes
import authRouter from "./routes/authRoutes.js";
import aiRouter from "./routes/aiRoutes.js";
import trainingPlanRouter from "./routes/trainingPlanRoutes.js";
//middleware
import notFound from "./middleware/NotFound.js";
import ErrorHandler from "./middleware/ErrorHandler.js";

const app = express();
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(fileUpload({ useTempFiles: true }));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/trainingPlan", trainingPlanRouter);
app.use("/api/v1/ai", aiRouter);

app.use(notFound);
app.use(ErrorHandler);

const port = process.env.PORT || 5000;
const init = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
    await connectDb();
  } catch (error) {
    console.log(error);
  }
};
init();

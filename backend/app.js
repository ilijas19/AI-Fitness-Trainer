//packages
import "express-async-errors";
import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import path from "path";
import cors from "cors";
//security
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
//db
import { connectDb } from "./db/connectDb.js";
//routes
import authRouter from "./routes/authRoutes.js";
import aiRouter from "./routes/aiRoutes.js";
import trainingPlanRouter from "./routes/trainingPlanRoutes.js";
import mealPlanRouter from "./routes/mealPlanRoutes.js";
import workoutRouter from "./routes/workoutRoutes.js";
//middleware
import notFound from "./middleware/NotFound.js";
import ErrorHandler from "./middleware/ErrorHandler.js";

const app = express();
const __dirname = path.resolve();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(fileUpload({ useTempFiles: true }));
app.use(limiter);
app.use(mongoSanitize());
app.use(helmet());

app.use(
  cors({
    origin: [
      "https://ai-fitness-trainer-hk05.onrender.com",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/trainingPlan", trainingPlanRouter);
app.use("/api/v1/mealPlan", mealPlanRouter);
app.use("/api/v1/workout", workoutRouter);
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

import "express-async-errors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import { authenticateUser } from "./middlewares/authMiddleware.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import cloudinary from "cloudinary";
import rateLimiter from 'express-rate-limit';
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

//app security middlewares 
app.set('trust proxy', 1);
app.use(rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 60,
  message: "Too many requests received, please try again later."
}))

app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

//Other middlewares 
app.use(express.static(path.resolve(__dirname, "./public")));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());

// API endpoints
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/users", authenticateUser, userRouter);

// website routes 
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public", "index.html"));
});

// error handler and not found middleware
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5100;


// database connection and server setup 
try {
  await mongoose.connect(process.env.MONGO_URL);

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
  
} catch (error) {
  console.log(error);
  process.exit(1);
}

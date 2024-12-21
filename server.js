import "express-async-errors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";
import jobRouter from "./routes/jobRouter.js";
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
import { authenticateUser } from "./middlewares/authMiddleware.js";


const app = express();

app.use(cookieParser())
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("My MERN app");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/users", authenticateUser, userRouter);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);

  app.listen(port, () => {
    console.log(`Port is listening on port ${port}`)
  })

} catch (error) {
  console.log(error);
  process.exit(1);
}

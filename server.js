import "express-async-errors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";
import jobRouter from "./routes/jobRouter.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());


app.get("/", (req, res) => {
  res.send("My MERN app");
});

app.use("/api/v1/jobs", jobRouter)

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`Port is listening on port ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}

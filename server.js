import express from "express";
import "dotenv/config";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("My MERN app");
});

app.listen(5100, () => console.log("Server is listening to port 5100"));

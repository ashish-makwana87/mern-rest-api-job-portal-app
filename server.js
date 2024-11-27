import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("My MERN app");
});

app.listen(5100, () => console.log("Server is listening to port 5100"));

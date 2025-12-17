import express from "express";
import { env } from "./config/env.js";

const app = express();

app.get("/", (_req, res) => {
  res.send("Hello world");
});

const PORT = env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import express from "express";
import { env } from "./config/env.js";
import db from "./models/index.js";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello world");
});

const PORT = env.PORT || 5000;
db.sequelize.sync({ alter: true }).then(() => {
  console.log("Database synced");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error("Failed to sync database:", err);
});


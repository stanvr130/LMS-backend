import express from "express";
import { protect } from "./middleware/auth.js";
import adminRoutes from "./routes/admin/route.js";
import authRoutes from "./routes/auth/route.js";
import { globalErrorHandler } from "./middleware/errorHandler.js";
import AppError from "./utils/AppError.js";

const createApp = () => {
  const app = express();
  app.use(express.json());

  app.get("/", (_req, res) => {
    res.send("Hello world");
  });

  app.use("/api/auth", authRoutes);

  /*
   * all routes before this middleware are unprotected
   * all routes after this middleware are protected
   */
  app.use(protect);

  app.use("/api/admin", adminRoutes);

  // Handle unhandled routes (404)
  app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });

  // Global Error Handler
  app.use(globalErrorHandler);

  return app;
};

export default createApp;

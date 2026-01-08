export const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";

  console.error(`[ERROR] ${statusCode} - ${err.message}`);

  res.status(statusCode).json({
    status,
    message: err.message,
    // The stack trace helps you find the bug, but only shows in development
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

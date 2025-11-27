
class CustomError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

const errorMiddleware = (err, req, res, next) => {
  const statusCode = err?.statusCode || 500;
  const message = err?.message || "Internal Server Error";

  if (process.env.NODE_ENV !== "production") {
    console.error("Error:", { message, statusCode, stack: err?.stack });
  } else {
    console.error("Error:", message);
  }

  return res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = {
  CustomError,
  errorMiddleware,
};
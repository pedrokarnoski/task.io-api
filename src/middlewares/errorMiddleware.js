const AppError = require("../utils/AppError");

const errorMiddleware = (err, req, res, next) => {
  if (req && res && res.headersSent) {
    return next(err);
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  console.error(err);

  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};

module.exports = errorMiddleware;

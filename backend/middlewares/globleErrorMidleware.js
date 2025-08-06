const NODE_ENV = process.env.NODE_ENV;
import CustomErrorHandler from "../utils/errorHandler.js";

const developmetError = (error, res) => {
  res.status(error.statusCode).json({
    success :  false,
    message: error.message,
    stackTrace : error.stack,
        error : error
  });
};

const productionError = (err, res) => {
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new CustomErrorHandler(message, 400);
  }
  if (err.name === "JsonWebTokenError") {
    const message = "JSON Web Token is invalid. Try again.";
    err = new CustomErrorHandler(message, 400);
  }

  if (err.name === "TokenExpiredError") {
    const message = "JSON Web Token has expired.";
    err = new CustomErrorHandler(message, 400);
  }

  if (err.name === "CastError") {
    const message = `Invalid ${err.path}`;
    err = new CustomErrorHandler(message, 400);
  }

  const errorMessage = err.errors
    ? Object.values(err.errors)
        .map((error) => error.message)
        .join(" ")
    : err.message;
  res.status(err.statusCode).json({
    success: false,
    message: errorMessage,
  });
};

const globleErrorHandler = (error, req, res, next) => {
  error.message = error.message || "something went wrong.";
  error.statusCode = error.statusCode || 500;

  if (NODE_ENV == "production") {
    productionError(error, res);
  } else if (NODE_ENV == "development") {
    developmetError(error, res);
  }
};

export default globleErrorHandler;

import CustomErrorHandler from "../utils/errorHandler.js";

const restrict = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new CustomErrorHandler("You are not authorized to access this route", 403));
    }
    next();
  };
};

export default restrict;

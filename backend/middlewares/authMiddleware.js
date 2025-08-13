import jwt from "jsonwebtoken";
import User from "../models/User.js";
import CustomErrorHandler from "../utils/errorHandler.js";
const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return next(
        new CustomErrorHandler("Unauthorized: No token provided", 401)
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new CustomErrorHandler("User not found", 404));
    }

    if (user.isBlock) {
      return next(
        new CustomErrorHandler("Access denied: You are blocked", 403)
      );
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new CustomErrorHandler("Unauthorized: Invalid token", 401));
  }
};

export default verifyToken;

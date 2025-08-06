
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import CustomErrorHandler from '../utils/errorHandler.js';
const verifyToken = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) return next(new CustomErrorHandler("Unauthorized", 401));

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findOne({_id : decoded.id}); // assuming token contains user _id
  next();
};

export  default verifyToken
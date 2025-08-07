import express from "express";
import {
  changePassword,
  forgotPassword,
  getAllUsers,
  getProfile,
  logoutUser,
  resetPassword,
  signIn,
  signUp,
  toggleUserBlock,
  updateUserProfile,
} from "../controller/auth.Controller.js";
import verifyToken from "../middlewares/authMiddleware.js";
import restrict from "../middlewares/restrictAuth.js";
const authRouter = express.Router();

authRouter.route("/register").post(signUp);
authRouter.route("/login").post(signIn);
authRouter.route("/profile").get(verifyToken, getProfile);
authRouter.route("/logout").get(verifyToken, logoutUser);
authRouter.route("/update").put(verifyToken, updateUserProfile);
authRouter.route("/change-password").put(verifyToken, changePassword);
authRouter.route("/forgot-password").post(forgotPassword);
authRouter.route("/reset-password/:token").put(resetPassword);
authRouter
  .route("/block/:id")
  .put(verifyToken, restrict("admin"), toggleUserBlock);
authRouter
  .route("/get-all-users")
  .get(verifyToken, restrict("admin", "auther"), getAllUsers);
export default authRouter;

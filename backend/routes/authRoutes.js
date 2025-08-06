import express from "express";
import { changePassword, getProfile, logoutUser, signIn, signUp, updateUserProfile } from "../controller/auth.Controller.js";
import verifyToken from "../middlewares/authMiddleware.js";
const authRouter = express.Router();

authRouter.route("/register").post(signUp);
authRouter.route("/login").post(signIn);
authRouter.route("/profile").get(verifyToken, getProfile); 
authRouter.route("/logout").get(verifyToken, logoutUser);
authRouter.route("/update").put(verifyToken, updateUserProfile);
authRouter.route("/change-password").put(verifyToken, changePassword);
export default authRouter;

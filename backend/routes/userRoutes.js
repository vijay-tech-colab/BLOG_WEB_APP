import express from "express";
import { getAdminAndAuthor, getTeamById } from "../controller/user.Controller.js";
import verifyToken from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.get('/team', verifyToken,  getAdminAndAuthor)
userRouter.get('/team/:id', verifyToken,  getTeamById);

export default userRouter;
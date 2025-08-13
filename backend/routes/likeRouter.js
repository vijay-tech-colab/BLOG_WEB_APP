import express from "express";
import { toggleLike, getMostLikedPosts , totalLikeOnDocs} from "../controller/like.Controller.js";
import verifyToken from "../middlewares/authMiddleware.js";

const likeRouter = express.Router();

// Like/Unlike a post
likeRouter.put("/:id/like", verifyToken, toggleLike);

// Get most liked posts
likeRouter.get("/most-liked", verifyToken, getMostLikedPosts);
likeRouter.get("/:id/totalLikes" , verifyToken ,  totalLikeOnDocs)
export default likeRouter;

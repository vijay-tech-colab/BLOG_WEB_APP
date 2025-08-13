import express from "express";
import {
  createBlogPost,
  deleteBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
} from "../controller/blogPost.Controller.js";
import verifyToken from "../middlewares/authMiddleware.js";
import restrict from "../middlewares/restrictAuth.js";
const blogRouter = express.Router();
blogRouter.post(
  "/create-blog",
  verifyToken,
  restrict("admin", "author"),
  createBlogPost
);
blogRouter.get(
  "/get-all-blogs",
  verifyToken,
  restrict("admin", "author", "reader"),
  getAllBlogPosts
);

blogRouter.get(
  "/get-blog/:id",
  verifyToken,
  restrict("admin", "author", "reader"),
  getBlogPostById
);

blogRouter.put(
  "/update-blog/:id",
  verifyToken,
  restrict("admin", "author"),
  updateBlogPost
);
blogRouter.delete(
  "/delete-blog/:id",
  verifyToken,
  restrict("admin", "author"),
  deleteBlogPost
);

export default blogRouter;

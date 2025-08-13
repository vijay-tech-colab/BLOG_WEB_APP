import BlogPost from "../models/BlogPost.js";
import catchAsyncHandler from "../utils/catchAsyncHandler.js";

// ✅ Toggle Like / Unlike
export const toggleLike = catchAsyncHandler(async (req, res) => {
    const { id } = req.params; // post ID
    const userId = req.user._id; // assuming auth middleware adds req.user

    const post = await BlogPost.toggleLike(id, userId);
    res.status(200).json({
      success: true,
      message: post.likes.includes(userId)
        ? "Post liked successfully."
        : "Like removed successfully.",
      likeCount: post.likeCount,
      likes: post.likes,
    });
})

export const totalLikeOnDocs  = catchAsyncHandler(async (req,res,next) => {
    const blogs = await BlogPost.findById(req.params.id);
    const totalCount = blogs.likeCount
    res.status(200).json({
      success: true,
      likeCount: totalCount,
    });
})
// ✅ Get Most Liked Posts
export const getMostLikedPosts = catchAsyncHandler(async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const posts = await BlogPost.findMostLiked(limit).populate("author", "name email");

    res.status(200).json({
      success: true,
      count: posts.length,
      posts,
    });
 
})

import mongoose from "mongoose";

const blogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    coverImage: { type: String, default: "" },
    tags: [String],
    category: { type: String, default: "General" },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    views: { type: Number, default: 0 },
    readTime: { type: String },

    // ✅ Likes
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // who liked
    likeCount: { type: Number, default: 0 }, // quick count
    createdAt : {
      type : Date,
      default : Date.now()
    }
  },
  { timestamps: true }
);

// ✅ Static method to toggle like
blogPostSchema.statics.toggleLike = async function (postId, userId) {
  const post = await this.findById(postId);
  if (!post) throw new Error("Post not found");

  const alreadyLiked = post.likes.includes(userId);

  if (alreadyLiked) {
    // Remove like
    post.likes = post.likes.filter(id => id.toString() !== userId.toString());
  } else {
    // Add like
    post.likes.push(userId);
  }

  post.likeCount = post.likes.length;
  await post.save();
  return post;
};

// ✅ Method to find most liked posts
blogPostSchema.statics.findMostLiked = function (limit = 10) {
  return this.find({ status: "published" })
    .sort({ createdAt: 1 })
    .limit(limit);
};

const BlogPost = mongoose.model("BlogPost", blogPostSchema);
export default BlogPost;

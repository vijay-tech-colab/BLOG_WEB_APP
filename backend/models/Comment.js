
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: [true, "Comment cannot be empty"],
      trim: true,
      minlength: [1, "Comment must have at least 1 character"],
      maxlength: [1000, "Comment cannot exceed 1000 characters"],
    },
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment", // For replies
      default: null,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Users who liked the comment
      },
    ],
  },
  { timestamps: true }
);

// Optional: Populate user info automatically
commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name avatar", // Adjust according to your user schema
  });
  next();
});

commentSchema.index({ post: 1 });

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;





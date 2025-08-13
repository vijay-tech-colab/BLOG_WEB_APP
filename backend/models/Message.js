import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
      required: [true, "Sender name is required"],
      trim: true,
      minlength: [2, "Sender name must be at least 2 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
      maxlength: [150, "Subject cannot be more than 150 characters"],
    },
    body: {
      type: String,
      required: [true, "Message body is required"],
      trim: true,
      minlength: [5, "Message body must be at least 5 characters"],
    },
    sentAt: {
      type: Date,
      default: Date.now, // automatically set when message is created
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

export default mongoose.model("Message", messageSchema);

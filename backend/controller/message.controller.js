import Message from "../models/Message.js"; // adjust path as needed
import catchAsyncHandler from "../utils/catchAsyncHandler.js";
import CustomErrorHandler from "../utils/errorHandler.js";

// Create a new message
export const createMessage = catchAsyncHandler(async (req, res) => {
  const { sender, email, subject, body, sentAt } = req.body;

  const message = new Message({
    sender,
    email,
    subject,
    body,
    sentAt, // optional, defaults to now if not provided
  });

  const savedMessage = await message.save();

  res.status(201).json({
    success: true,
    message: "Message created successfully",
    data: savedMessage,
  });
});

// Get all messages
export const getAllMessages = catchAsyncHandler(async (req, res) => {
  const messages = await Message.find().sort({ sentAt: -1 }); // newest first

  res.status(200).json({
    success: true,
    count: messages.length,
    data: messages,
  });
});

// Get message by ID
export const getMessageById = catchAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const message = await Message.findById(id);
  if (!message) {
    return next(new CustomErrorHandler("Message not found.", 404));
  }

  res.status(200).json({
    success: true,
    data: message,
  });
});

// Delete a message by ID
export const deleteMessage = catchAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const message = await Message.findById(id);
  if (!message) {
    return next(new CustomErrorHandler("Message not found.", 404));
  }

  await message.deleteOne();

  res.status(200).json({
    success: true,
    message: "Message deleted successfully",
  });
});

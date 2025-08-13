import express from "express";
import {
  createMessage,
  deleteMessage,
  getAllMessages,
  getMessageById,
} from "../controller/message.controller.js";
import verifyToken from "../middlewares/authMiddleware.js";
import restrict from "../middlewares/restrictAuth.js";

const messageRouter = express.Router();

// Public route to get all messages (optional: restrict if needed)
messageRouter.get("/messages", verifyToken, restrict("admin", "author"), getAllMessages);

// Public route to get a single message by ID (optional: restrict if needed)
messageRouter.get("/messages/:id", verifyToken, restrict("admin"), getMessageById);

// Create a message (maybe public, or require login?)
messageRouter.post("/send-message", verifyToken, createMessage);

// Delete a message by ID (protected & restricted to admin)
messageRouter.delete(
  "/delete-message/:id",
  verifyToken,
  restrict("admin"),
  deleteMessage
);

export default messageRouter;

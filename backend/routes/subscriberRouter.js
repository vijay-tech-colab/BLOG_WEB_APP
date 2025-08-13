import express from "express";
import verifyToken from "../middlewares/authMiddleware.js";
import { addSubscriber, checkSubscription, getSubscribers } from "../controller/subscriber.Controller.js";

const subscriberRouter = express.Router();

subscriberRouter.post("/post-subscribe", verifyToken, addSubscriber); // Add new subscriber
subscriberRouter.get("/get-subscriber",verifyToken,  getSubscribers); // Get all subscribers
subscriberRouter.get('/check-subscription' , verifyToken , checkSubscription);
export default subscriberRouter;

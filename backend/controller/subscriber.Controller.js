import Subscriber from "../models/subscriberUser.js";
import catchAsyncHandler from "../utils/catchAsyncHandler.js";
import CustomErrorHandler from "../utils/errorHandler.js";

export const addSubscriber = catchAsyncHandler(async (req, res, next) => {
  const email = req.user.email;

  if (!email) {
    return next(new CustomErrorHandler("Email is required", 400));
  }

  // Check if already subscribed
  const exists = await Subscriber.findOne({ email });
  if (exists) {
    return next(new CustomErrorHandler("Already Subscribed", 400));
  }

  const subscriber = await Subscriber.create({ email , isSubscribe :  true});

  res.status(201).json({
    success: true,
    message: "Subscribed successfully",
    subscriber,
  });
});

export const checkSubscription = catchAsyncHandler(async (req, res, next) => {
    const { email } = req.user;
    if (!email) {
      return next(new CustomErrorHandler("Please subscriber for update" , 400))
    }

    const subscriber = await Subscriber.findOne({ email });

    res.json({ success: true, isSubscribe: subscriber.isSubscribe });

})

export const getSubscribers = catchAsyncHandler(async (req, res) => {
  const subscribers = await Subscriber.find().sort({ createdAt: -1 });
  res.json({ success: true, subscribers });
});

import User from "../models/User.js";
import catchAsyncHandler from "../utils/catchAsyncHandler.js";

export const getAdminAndAuthor = catchAsyncHandler(async (req, res, next) => {
  const team = await User.find({ role: { $in: ["admin", "author"] } })
  res.status(200).json({
    success: true,
    data: team,
  })
});


export const getTeamById = catchAsyncHandler(async (req, res, next) => {
  const team = await User.findById(req.params.id)
  res.status(200).json({
    success: true,
    data: team,
  })
});


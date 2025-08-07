import User from "../models/User.js";
import ImageOperation from "../services/cloudinarySetup.js";
import catchAsyncHandler from "../utils/catchAsyncHandler.js";
import CustomErrorHandler from "../utils/errorHandler.js";
import { resetPasswordMailOptions } from "../utils/resetPasswordMailOptions.js";
import sendMail from "../utils/sendEmail.js";
import crypto from "crypto";
export const signUp = catchAsyncHandler(async (req, res, next) => {
  const { name, email, password, bio, role } = req.body;

  // 1. Validate input
  if (!name || !email || !password) {
    return next(new CustomErrorHandler("All fields are required", 400));
  }

  // 2. Check if user exists
  const isExistUser = await User.findOne({ email });
  if (isExistUser) {
    return next(new CustomErrorHandler("Email is already registered", 409));
  }

  // 3. Check avatar image
  if (!req.files || !req.files.avatar) {
    return next(new CustomErrorHandler("Please upload avatar", 400));
  }

  const avatarFile = req.files.avatar;

  // 4. Upload image to Cloudinary
  const imageOp = new ImageOperation(avatarFile.tempFilePath); // assuming tmp file is stored
  const avatar = await imageOp.saveImage("avatars");

  // 5. Create user
  const user = await User.create({
    name,
    email,
    password,
    bio,
    role,
    avatar,
  });

  // 6. Remove password before sending response
  user.password = undefined;

  // 7. Create token and send response
  const token = user.generateJwtToken();

  res
    .status(201)
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    })
    .json({
      success: true,
      message: "User registered successfully",
      data: { user },
    });
});

export const signIn = catchAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new CustomErrorHandler("All fields are required", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    return next(new CustomErrorHandler("Invalid email or password", 401));
  }
  user.password = null;
  const token = user.generateJwtToken();
  res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    })
    .json({
      success: true,
      message: "User signed in successfully",
      data: { user },
    });
});

export const getProfile = catchAsyncHandler(async (req, res, next) => {
  // req.user._id should be set by authentication middleware
  const user = await User.findById(req.user._id).select("-password");

  if (!user) {
    return next(new CustomErrorHandler("User not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "User profile fetched successfully",
    data: { user },
  });
});

export const logoutUser = catchAsyncHandler(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 0, // 1 day
    })
    .json({
      success: true,
      message: "User Logout successfully",
    });
});

export const updateUserProfile = catchAsyncHandler(async (req, res, next) => {
  const { name, email, bio } = req.body;

  // Get the current user from DB
  const user = await User.findById(req.user._id);
  if (!user) {
    return next(new CustomErrorHandler("User not found", 404));
  }

  // Update basic info
  if (name) user.name = name;
  if (email) user.email = email;
  if (bio) user.bio = bio;
  // If avatar is uploaded
  if (req.files && req.files.avatar) {
    const avatarFile = req.files.avatar;
    // 1. Delete old avatar from Cloudinary
    if (user.avatar?.public_id) {
      await ImageOperation.deleteImage(user.avatar.public_id);
    }

    // 2. Upload new avatar
    const imageOp = new ImageOperation(avatarFile.tempFilePath);
    const avatar = await imageOp.saveImage("avatars");

    user.avatar = avatar;
  }

  // Save updated user
  await user.save({ validateBeforeSave: true });

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: { user },
  });
});

export const changePassword = catchAsyncHandler(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return next(
      new CustomErrorHandler("Old and new passwords are required", 400)
    );
  }

  const user = await User.findById(req.user._id).select("+password");

  if (!user || !(await user.comparePassword(oldPassword))) {
    return next(new CustomErrorHandler("Old password is incorrect", 400));
  }

  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password changed successfully",
    data: { user },
  });
});

export const forgotPassword = catchAsyncHandler(async (req, res, next) => {
  const { email } = req.body;
  console.log(req.body);
  if (!email) {
    return next(
      new CustomErrorHandler("Please provide an email address.", 400)
    );
  }

  const user = await User.findOne({ email });
  if (!user) {
    return next(new CustomErrorHandler("User not found", 404));
  }

  const resetToken = user.generateResetToken();

  await user.save({ validateBeforeSave: false });

  const mailOptions = resetPasswordMailOptions(user.email, resetToken, req);
  try {
    await sendMail(mailOptions);
    res.status(200).json({
      success: true,
      message: `Password reset email sent to ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new CustomErrorHandler(
        "Email could not be sent. Please try again later.",
        500
      )
    );
  }
});

export const resetPassword = catchAsyncHandler(async (req, res, next) => {
  const resetToken = req.params.token;
  const password = req.body.password;
  console.log(resetToken);
  // 1. Hash the token
  const hashToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  console.log(hashToken);
  // 2. Find user with matching token and check expiry
  const user = await User.findOne({
    resetPasswordToken: hashToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new CustomErrorHandler("Token is invalid or has expired", 400));
  }

  // 3. Update password and clear reset fields
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  res.status(200).json({
    success: true,
    data: { user },
    message: "Password has been reset successfully",
  });
});


export const toggleUserBlock = catchAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  // Find the user first
  const user = await User.findById(id);
  if (!user) {
    return next(new CustomErrorHandler("User not found", 404));
  }

  // Toggle the isBlock status
  user.isBlock = !user.isBlock;
  await user.save({ validateBeforeSave: true });

  res.status(200).json({
    success: true,
    message: `User has been ${user.isBlock ? "blocked" : "unblocked"} successfully`,
    data : {user},
  });
});

export const getAllUsers = catchAsyncHandler(async (req, res, next) => {
  const users = await User.find();

  if (!users || users.length === 0) {
    return next(new CustomErrorHandler("No users found", 404));
  }

  res.status(200).json({
    success: true,
    message: "All users fetched successfully",
    data: { user : users },
  });
});



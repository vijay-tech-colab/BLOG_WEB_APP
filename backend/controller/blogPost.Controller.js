import BlogPost from "../models/BlogPost.js";
import Subscriber from "../models/subscriberUser.js";
import catchAsyncHandler from "../utils/catchAsyncHandler.js";
import CustomErrorHandler from "../utils/errorHandler.js";
import sendMail from "../utils/sendEmail.js";

import slugify from "slugify";

export const createBlogPost = catchAsyncHandler(async (req, res, next) => {
  let {
    title,
    slug,
    content,
    tags = [],
    category = "Uncategorized",
    status = "draft",
    readTime = "",
    coverImage = "",
  } = req.body;

  // Trim fields
  title = title?.trim();
  slug = slug?.trim();
  content = content?.trim();

  // Validate required fields
  if (!title || !content) {
    return next(
      new CustomErrorHandler("Title and content are required", 400)
    );
  }

  // Auto-generate slug if not provided
  if (!slug) {
    slug = slugify(title, { lower: true, strict: true });
  }

  // Check for duplicate slug
  const blogExists = await BlogPost.findOne({ slug });
  if (blogExists) {
    return next(
      new CustomErrorHandler("Blog post with this slug already exists", 400)
    );
  }

  // Normalize tags
  const normalizedTags = Array.isArray(tags)
    ? tags.map(tag => tag.trim()).filter(Boolean)
    : typeof tags === "string"
      ? tags.split(",").map(tag => tag.trim()).filter(Boolean)
      : [];

  // Auto-calculate read time if not provided
  if (!readTime) {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    readTime = `${Math.ceil(wordCount / wordsPerMinute)} min read`;
  }

  // Create blog post
  const blog = await BlogPost.create({
    title,
    slug,
    content,
    coverImage,
    tags: normalizedTags,
    category,
    status,
    readTime,
    author: req.user._id,
  });

  // Notify subscribers
  try {
    const subscribers = await Subscriber.find({}, "email");
    const emails = subscribers.map((user) => user.email);

    console.log(emails);
    if (emails.length > 0) {
      await sendMail({
        to: emails.join(","), // multiple recipients
        subject: `📰 New Blog Post: ${title}`,
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #f8f9fa; padding: 20px;">
            <div style="max-width: 600px; background: white; border-radius: 8px; overflow: hidden; margin: auto; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              
              <!-- Header -->
              <div style="background-color: #4f46e5; padding: 15px; color: white; text-align: center;">
                <h1 style="margin: 0; font-size: 24px;">📢 New Blog Alert!</h1>
              </div>

              <!-- Content -->
              <div style="padding: 20px;">
                <h2 style="color: #333;">${title}</h2>
                <p style="color: #555; line-height: 1.5;">
                  ${content.substring(0, 200)}...
                </p>

                ${
                  coverImage
                    ? `<img src="${coverImage}" alt="Blog Image" style="max-width:100%; border-radius: 6px; margin: 10px 0;">`
                    : ""
                }

                <a href="${process.env.FRONTEND_URL}/blog/${blog._id}" 
                  style="display:inline-block; padding: 10px 20px; background-color: #4f46e5; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
                  Read Full Article →
                </a>
              </div>

              <!-- Footer -->
              <div style="background-color: #f1f1f1; padding: 10px; font-size: 12px; color: #777; text-align: center;">
                You are receiving this email because you subscribed to our blog updates.<br>
                <a href="${process.env.FRONTEND_URL}/unsubscribe" style="color: #4f46e5;">Unsubscribe</a>
              </div>

            </div>
          </div>
        `,
      });
    }
  } catch (error) {
    return next(new CustomErrorHandler("Email notification failed", 500));
  }

  res.status(201).json({
    success: true,
    message: "Blog post created successfully",
    data: blog,
  });
});


// 📌 Get all blogs
export const getAllBlogPosts = catchAsyncHandler(async (req, res) => {
  const blogs = await BlogPost.find().populate("author", "name email");
  res.status(200).json({
    success: true,
    count: blogs.length,
    data: blogs,
  });
});

// 📌 Get blog by ID
export const getBlogPostById = catchAsyncHandler(async (req, res, next) => {
  const blog = await BlogPost.findById(req.params.id).populate(
    "author",
    "name email"
  );

  if (!blog) {
    return next(new CustomErrorHandler("Blog post not found", 404));
  }

  res.status(200).json({
    success: true,
    data: blog,
  });
});

export const updateBlogPost = catchAsyncHandler(async (req, res, next) => {
  let blog = await BlogPost.findById(req.params.id);
  console.log(req.params.id);
  if (!blog) {
    return next(new CustomErrorHandler("Blog post not found", 404));
  }

  // Author or admin check
  if (
    blog.author.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    return next(
      new CustomErrorHandler("Not authorized to update this blog", 403)
    );
  }

  blog = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "Blog post updated successfully",
    data: blog,
  });
});

export const deleteBlogPost = catchAsyncHandler(async (req, res, next) => {
  const blog = await BlogPost.findById(req.params.id);

  if (!blog) {
    return next(new CustomErrorHandler("Blog post not found", 404));
  }

  if (
    blog.author.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    return next(
      new CustomErrorHandler("Not authorized to delete this blog", 403)
    );
  }
  await BlogPost.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: blog,
    message: "Blog post deleted successfully",
  });
});

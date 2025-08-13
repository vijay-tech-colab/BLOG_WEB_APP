import { useParams } from "react-router-dom";
import { Eye, Clock, Heart, FolderOpen, UserRound, ThumbsUp } from "lucide-react";
import GoDashboard from "@/components/sub-components/GoDashboard";
import { useEffect, useState } from "react";
import { getBlogById } from "@/store/slices/blogSlice";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "@/components/ui/badge";
import LikeButton from "@/components/sub-components/LikeBtn";

const BlogDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleBlog, loadingSingle } = useSelector((state) => state.blog);

  useEffect(() => {
    if (id) {
      dispatch(getBlogById(id));
    }
  }, [dispatch, id]);

  if (loadingSingle) {
    return (
      <div className="p-8 text-center text-gray-500 text-lg">
        Loading blog details...
      </div>
    );
  }

  if (!singleBlog) {
    return (
      <div className="p-8 text-center text-red-500 text-lg">
        Blog not found.
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <div className="min-h-full flex justify-center px-4">
        <div className="max-w-4xl w-full bg-white shadow-md rounded-xl overflow-hidden">
          {/* Cover Image */}
          {singleBlog.coverImage && (
            <img
              src={singleBlog.coverImage}
              alt={singleBlog.title}
              className="w-full h-80 object-cover"
            />
          )}

          <div className="p-6 space-y-6">
            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900 leading-snug">
              {singleBlog.title}
            </h1>

            {/* Author & Meta */}
            <div className="flex flex-wrap items-center text-gray-500 text-sm gap-4 border-b pb-4">
              {/* Author */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm font-medium">
                  {singleBlog.author?.name?.[0]?.toUpperCase() || "?"}
                </div>
                <span className="flex items-center gap-1">
                  <UserRound className="w-4 h-4" /> {singleBlog.author?.name}
                </span>
              </div>

              {/* Category */}
              <span className="flex items-center gap-2">
                <FolderOpen className="w-4 h-4" /> {singleBlog.category}
              </span>

              {/* Views */}
              <span className="flex items-center gap-2">
                <Eye className="w-4 h-4" /> {singleBlog.views}
              </span>

              {/* Read Time */}
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" /> {singleBlog.readTime}
              </span>

              {/* Like */}
              <LikeButton postId={id}/>
            </div>

            {/* Content */}
            <div
              className="prose max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: singleBlog.content }}
            />

            {/* Tags */}
            {singleBlog.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-4 border-t">
                {singleBlog.tags.map((tag, i) => (
                  <Badge key={i} variant="outline" className="cursor-pointer">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Back Button */}
      <GoDashboard path="/dashboard/manage-blogs">
        Back to Blogs
      </GoDashboard>
    </div>
  );
};

export default BlogDetails;

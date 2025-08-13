import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash, Eye, EyeOff, Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  editBlog,
  postBlog,
  getAllBlogs,
  deleteBlog,
} from "@/store/slices/blogSlice";
import moment from "moment";

const API_URL = `${import.meta.env.VITE_API_URL}/api/v1/blog`;

const BlogManager = () => {
  const { allBlogs } = useSelector((state) => state.blog);
  const dispatch = useDispatch();
  const [editingBlog, setEditingBlog] = useState(null);

  const handleDelete = async (id) => {
    dispatch(deleteBlog(id));
  };

  const handleToggleStatus = async (id) => {
    try {
      const blog = allBlogs.find((b) => b._id === id);
      if (!blog) throw new Error("Blog not found");

      const newStatus = blog.status === "published" ? "draft" : "published";
      await axios.put(
        `${API_URL}/update-blog/${id}`,
        { status: newStatus },
        { withCredentials: true }
      );

      // toast.success(res.data.);
      dispatch(getAllBlogs());
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  return (
    <div className="p-4 space-y-6 max-w-screen-xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h2 className="text-2xl font-semibold">Manage Blogs</h2>
        <PopupForm editingBlog={editingBlog} setEditingBlog={setEditingBlog} />
      </div>

      {/* Blog Grid */}
      {allBlogs.length === 0 ? (
        <p className="text-muted-foreground text-center py-10">
          No blogs found. Click <strong>Create Blog</strong> to add one.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allBlogs.map((blog) => (
            <Card
              key={blog?._id}
              className="border shadow-sm hover:shadow-md transition duration-200"
            >
              <CardContent className="p-5 flex flex-col gap-4">
                {/* Cover Image */}
                {blog?.coverImage && (
                  <Link to={`/dashboard/blogs/${blog?._id}`}>
                    <img
                      src={blog?.coverImage}
                      alt={blog?.title}
                      className="w-full h-40 object-cover rounded-md border"
                    />
                  </Link>
                )}

                {/* Title & Meta */}
                <div>
                  <Link to={`/dashboard/blogs/${blog?._id}`}>
                    <h2 className="text-lg font-semibold hover:underline">
                      {blog?.title}
                    </h2>
                  </Link>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>Category: {blog?.category}</p>
                    <p>createdAt : {moment(blog.createdAt || blog.publishedAt).format("MMMM Do, YYYY")}</p>
                    <p className="text-sm text-gray-700 mt-1">
                      Published On : {" "}
                      {moment(blog.createdAt || blog.publishedAt).fromNow()}
                    </p>
                  </div>
                </div>

                {/* Tags */}
                {blog?.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {blog.tags.map((tag, i) => (
                      <Badge key={i} variant="outline">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Status */}
                <Badge
                  variant={
                    blog?.status === "published" ? "default" : "destructive"
                  }
                  className="w-fit"
                >
                  {blog?.status}
                </Badge>

                {/* Actions */}
                <div className="flex justify-between items-center pt-2 border-t mt-2">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setEditingBlog(blog)}
                    >
                      <Pencil className="w-4 h-4 mr-1" /> Edit
                    </Button>

                    {/* Delete with Confirmation */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="destructive">
                          <Trash className="w-4 h-4 mr-1" /> Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. The blog will be
                            permanently deleted.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(blog._id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleToggleStatus(blog._id)}
                  >
                    {blog?.status === "published" ? (
                      <>
                        <EyeOff className="w-4 h-4 mr-1" /> Draft
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4 mr-1" /> Publish
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

function PopupForm({ editingBlog, setEditingBlog }) {
  const dispatch = useDispatch();
  const { loadingAll } = useSelector((state) => state.blog);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    coverImage: "",
    tags: "",
    category: "",
  });
  const [open, setOpen] = useState(false);

  // Fill form when editing
  useEffect(() => {
    if (editingBlog) {
      setFormData({
        title: editingBlog.title || "",
        slug: editingBlog.slug || "",
        content: editingBlog.content || "",
        coverImage: editingBlog.coverImage || "",
        tags: editingBlog.tags ? editingBlog.tags.join(", ") : "",
        category: editingBlog.category || "",
      });
      setOpen(true);
    }
  }, [editingBlog]);

  const handleClose = () => {
    setOpen(false);
    setEditingBlog(null);
    setFormData({
      title: "",
      slug: "",
      content: "",
      coverImage: "",
      tags: "",
      category: "",
    });
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      tags: formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      if (editingBlog) {
        const result = await dispatch(
          editBlog({ id: editingBlog._id, payload })
        ).unwrap();
        toast.success(result.message || "Blog updated successfully");
      } else {
        const result = await dispatch(postBlog(payload)).unwrap();
        toast.success(result.message || "Blog created successfully");
      }
      handleClose();
      dispatch(getAllBlogs());
    } catch (err) {
      toast.error(err || "Operation failed");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setEditingBlog(null)}>
          <Plus className="mr-1 w-4 h-4" /> Create Blog
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90vw] max-w-xl max-h-[90vh] overflow-y-auto rounded-lg">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {editingBlog ? "Edit Blog" : "Create New Blog"}
            </DialogTitle>
            <DialogDescription>
              {editingBlog
                ? "Update the details and click update."
                : "Fill in the details and click create."}
            </DialogDescription>
          </DialogHeader>

          {/* Fields */}
          <div className="grid gap-4 py-4">
            {[
              { label: "Title", name: "title" },
              { label: "Slug", name: "slug" },
              { label: "Cover Image URL", name: "coverImage" },
              { label: "Tags (comma separated)", name: "tags" },
              { label: "Category", name: "category" },
            ].map((field) => (
              <div className="grid gap-2" key={field.name}>
                <Label htmlFor={field.name}>{field.label}</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required={field.name !== "coverImage"}
                />
              </div>
            ))}
            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              <textarea
                id="content"
                name="content"
                rows="5"
                className="w-full border rounded p-2"
                value={formData.content}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Actions */}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={loadingAll}>
              {loadingAll && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editingBlog ? "Update Blog" : "Create Blog"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default BlogManager;

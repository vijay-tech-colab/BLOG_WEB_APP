import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/v1/blog`;

// Fetch all blogs
export const getAllBlogs = createAsyncThunk(
  "blog/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/get-all-blogs`, { withCredentials: true });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Fetch blog by ID
export const getBlogById = createAsyncThunk(
  "blog/getById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/get-blog/${id}`, { withCredentials: true });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Edit blog
export const editBlog = createAsyncThunk(
  "blog/edit_blog",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API_URL}/update-blog/${id}`, payload, { withCredentials: true });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Delete blog - fixed to DELETE method
export const deleteBlog = createAsyncThunk(
  "blog/delete_blog",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${API_URL}/delete-blog/${id}`, { withCredentials: true });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Create blog
export const postBlog = createAsyncThunk(
  "blog/post_blog",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/create-blog`, payload, { withCredentials: true });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    loadingAll: false,
    loadingSingle: false,
    blogError: null,
    blogMessage: null,
    allBlogs: [],
    singleBlog: null,
  },
  reducers: {
    clearError(state) {
      state.blogError = null;
    },
    clearMessage(state) {
      state.blogMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create blog
      .addCase(postBlog.pending, (state) => {
        state.loadingAll = true;
        state.blogError = null;
        state.blogMessage = null;
      })
      .addCase(postBlog.fulfilled, (state, action) => {
        state.loadingAll = false;
        if (action.payload?.blog) {
          state.allBlogs.push(action.payload.blog);
        }
        state.blogMessage = action.payload?.message || null;
      })
      .addCase(postBlog.rejected, (state, action) => {
        state.loadingAll = false;
        state.blogError = action.payload;
        state.blogMessage = null;
      })

      // Get all blogs
      .addCase(getAllBlogs.pending, (state) => {
        state.loadingAll = true;
        state.blogError = null;
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.loadingAll = false;
        state.allBlogs = action.payload?.data || [];
        state.blogMessage = action.payload?.message || null;
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.loadingAll = false;
        state.blogError = action.payload;
        state.blogMessage = null;
      })

      // Get blog by ID
      .addCase(getBlogById.pending, (state) => {
        state.loadingSingle = true;
        state.blogError = null;
      })
      .addCase(getBlogById.fulfilled, (state, action) => {
        state.loadingSingle = false;
        state.singleBlog = action.payload?.data || null;
        state.blogMessage = action.payload?.message || null;
      })
      .addCase(getBlogById.rejected, (state, action) => {
        state.loadingSingle = false;
        state.blogError = action.payload;
        state.blogMessage = null;
      })

      // Edit blog
      .addCase(editBlog.pending, (state) => {
        state.loadingAll = true;
        state.blogError = null;
      })
      .addCase(editBlog.fulfilled, (state, action) => {
        state.loadingAll = false;
        const index = state.allBlogs.findIndex((blog) => blog._id === action.payload?.data?._id);
        if (index !== -1) {
          state.allBlogs[index] = action.payload.data;
        }
        state.blogMessage = action.payload?.message || null;
      })
      .addCase(editBlog.rejected, (state, action) => {
        state.loadingAll = false;
        state.blogError = action.payload;
        state.blogMessage = null;
      })

      // Delete blog
      .addCase(deleteBlog.pending, (state) => {
        state.loadingSingle = true;
        state.blogError = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loadingSingle = false;
        // Remove deleted blog from allBlogs if present
        if(action.payload?.data?._id) {
          state.allBlogs = state.allBlogs.filter(blog => blog._id !== action.payload.data._id);
        }
        state.singleBlog = null;
        state.blogMessage = action.payload?.message || null;
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.loadingSingle = false;
        state.blogError = action.payload;
        state.blogMessage = null;
      });
  },
});

export const { clearError, clearMessage } = blogSlice.actions;
export default blogSlice.reducer;

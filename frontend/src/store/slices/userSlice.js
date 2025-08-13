import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/v1/auth`;

// Login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/login`, payload, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Register
export const registerUser = createAsyncThunk(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/register`, payload, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Profile
export const getProfile = createAsyncThunk(
  "auth/profile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/profile`, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Logout
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/logout`, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Update user
export const updateUser = createAsyncThunk(
  "auth/update",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API_URL}/update`, payload, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Change password
export const updatePassword = createAsyncThunk(
  "auth/change-password",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API_URL}/change-password`, payload, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Forgot password
export const forgotPassword = createAsyncThunk(
  "auth/forgot-password",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/forgot-password`, payload, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Reset password
export const resetPassword = createAsyncThunk(
  "auth/reset-password",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${API_URL}/reset-password/${token}`,
        payload,
        { withCredentials: true }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// get all users
export const getAllUsers = createAsyncThunk(
  "auth/get-users",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/get-all-users`, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const addNewAdmin = createAsyncThunk(
  "auth/new_admin",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/create-admin`, payload, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// block and unblock

export const toggleBlock = createAsyncThunk(
  "auth/toggleBlock",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${API_URL}/block/${id}`,
        {},
        { withCredentials: true }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const deleteAccount = createAsyncThunk(
  "auth/delete_account",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${API_URL}/delete-account/${id}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    error: null,
    message: null,
    user: null,
    isAuthenticated: false,
    allUsers: [],
  },
  reducers: {
    clearMessage: (state) => {
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.data?.user || action.payload?.user;
        state.isAuthenticated = true;
        state.message = action.payload.message;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })

      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.data?.user || action.payload?.user;
        state.isAuthenticated = true;
        state.message = action.payload.message;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })

      // Profile
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.data?.user || action.payload?.user;
        state.isAuthenticated = true;
        // state.message = action.payload.message;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })

      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.message = action.payload.message;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update user
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.data?.user;
        state.message = action.payload.message;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update password
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Forgot password
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Reset password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // get All users

      .addCase(getAllUsers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers = action.payload.data?.user || [];
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })

      // create new admin

      .addCase(addNewAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers.push(action.payload.data);
        state.message = action.payload.message;
      })
      .addCase(addNewAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // toggleblock
      .addCase(toggleBlock.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleBlock.fulfilled, (state, action) => {
        state.loading = false;
        const indexUser = state.allUsers.findIndex(
          (u) => u._id === action.payload.data?.user._id
        );
        state.allUsers[indexUser] = action.payload.data?.user;
        state.message = action.payload.message;
      })
      .addCase(toggleBlock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // delete account

      .addCase(deleteAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.loading = false;
        // console.log(action.payload);
        const deletedUserId = action.payload.data?.user._id;
        state.allUsers = state.allUsers.filter((u) => u._id !== deletedUserId);
        state.message = action.payload.message;
      })

      .addCase(deleteAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessage, clearError } = userSlice.actions;
export default userSlice.reducer;

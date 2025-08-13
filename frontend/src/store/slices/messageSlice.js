import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/v1/message`;

// Fetch all messages
export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/messages`, { withCredentials: true });
      // response.data = { success, count, data }
      return response.data.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Fetch single message by ID
export const fetchMessageById = createAsyncThunk(
  "messages/fetchMessageById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/messages/${id}`, { withCredentials: true });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Create new message
export const createMessage = createAsyncThunk(
  "messages/createMessage",
  async (messageData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/send-message`, messageData, { withCredentials: true });
      // response.data = { success, message, data }
      return { message: response.data.message, data: response.data.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Delete message by ID
export const deleteMessage = createAsyncThunk(
  "messages/deleteMessage",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/delete-message/${id}`, { withCredentials: true });
      // response.data = { success, message }
      return { id, message: response.data.message };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    userMessages: [],
    currentMessage: null,
    loading: false,
    messageError: null,
    messagesMessage: null,
  },
  reducers: {
    clearMessagesState(state) {
      state.messageError = null;
      state.messagesMessage = null;
      state.loading = false;
    },
    clearCurrentMessage(state) {
      state.currentMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all messages
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.messageError = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.userMessages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.messageError = action.payload || "Failed to fetch messages";
      })

      // Fetch single message
      .addCase(fetchMessageById.pending, (state) => {
        state.loading = true;
        state.messageError = null;
        state.currentMessage = null;
      })
      .addCase(fetchMessageById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentMessage = action.payload;
      })
      .addCase(fetchMessageById.rejected, (state, action) => {
        state.loading = false;
        state.messageError = action.payload || "Failed to fetch message";
      })

      // Create message
      .addCase(createMessage.pending, (state) => {
        state.loading = true;
        state.messageError = null;
        state.messagesMessage = null;
      })
      .addCase(createMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messagesMessage = action.payload.message || "Message created successfully";
        state.userMessages.push(action.payload.data);
      })
      .addCase(createMessage.rejected, (state, action) => {
        state.loading = false;
        state.messageError = action.payload || "Failed to create message";
      })

      // Delete message
      .addCase(deleteMessage.pending, (state) => {
        state.loading = true;
        state.messageError = null;
        state.messagesMessage = null;
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messagesMessage = action.payload.message || "Message deleted successfully";
        state.userMessages = state.userMessages.filter((msg) => msg._id !== action.payload.id);
      })
      .addCase(deleteMessage.rejected, (state, action) => {
        state.loading = false;
        state.messageError = action.payload || "Failed to delete message";
      });
  },
});

export const { clearMessagesState, clearCurrentMessage } = messagesSlice.actions;
export default messagesSlice.reducer;

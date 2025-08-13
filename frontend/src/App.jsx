// App.jsx
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, clearMessage, getAllUsers, getProfile } from "./store/slices/userSlice";
import LoginSection from "./pages/LoginSection";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./pages/ProtectedRoutes";
import BlogPage from "./pages/BlogPage";
import Profile from "./components/sub-components/Profile";
import AdminMainSection from "./pages/AdminMainSection";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import ForgotPasswordPage from "./pages/ForgotPassord";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import UsersList from "./pages/ManageUsers";
import BlogManager from "./pages/ManageBlog";
import { AddAdmin } from "./pages/AddAdmin";
import MessageList from "./pages/MessageList";
import BlogDetails from "./pages/BlogDetails";
import MessageDetails from "./pages/MessageDetails";
import { getAllBlogs } from "./store/slices/blogSlice";
import ManageUsers from "./pages/ManageUsers";
import { clearMessagesState, fetchMessages } from "./store/slices/messageSlice";
import BlogHeader from './components/sub-components/BlogHeader'
import BlogSection from "./pages/BlogSection";
import AboutSection from "./components/sub-components/aboutBlog";
import ContactPage from "./pages/blogContact";
import Register from "./components/sub-components/Register";
import ViewProfile from "./pages/ViewProfile";
import NotFound from "./components/sub-components/NotFound";

export default function App() {
  const dispatch = useDispatch();
const { user, message, error } = useSelector((state) => state.user);
const { allBlogs, blogMessage, blogError } = useSelector((state) => state.blog);
const { messageError, messagesMessage } = useSelector((state) => state.message);

useEffect(() => {
  dispatch(getAllBlogs());
  dispatch(getProfile());
  dispatch(getAllUsers());
  dispatch(fetchMessages());
}, [dispatch, user?.role]);

  useEffect(() => {
    if (message) {
      toast.success(message);
      const timeout = setTimeout(() => {
        dispatch(clearMessage());
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [message, dispatch]);

  
  useEffect(() => {
    if (messagesMessage) {
      toast.success(messagesMessage);
      const timeout = setTimeout(() => {
        dispatch(clearMessagesState());
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [messagesMessage, dispatch]);

  useEffect(() => {
    const errorMsg = error || messageError || blogError;
    if (errorMsg) {
      toast.error(errorMsg);
      const timeout = setTimeout(() => {
        dispatch(clearError());
        dispatch(clearMessagesState());
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [error, messageError, blogError, dispatch]);

  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          className:
            "bg-gradient-to-r from-[#a1c4fd] to-[#c2e9fb] text-black shadow-lg border border-yellow-300",
        }}
      />
      <Routes>
        <Route path="/login" element={<LoginSection />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

        {/* Role-based redirect from "/" */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              {user?.role === "admin" || user?.role === "author" ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/home" />
              )}
            </ProtectedRoute>
          }
        />

          <Route
          path="/home"
          element={
            <ProtectedRoute>
              <BlogHeader/>
              <BlogPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blogs"
          element={
            <ProtectedRoute>
              <BlogHeader/>
              <BlogSection />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blog/about"
          element={
            <ProtectedRoute>
              <BlogHeader/>
              <AboutSection />
            </ProtectedRoute>
          }
        />

        <Route
          path="/blog/contact"
          element={
            <ProtectedRoute>
              <BlogHeader/>
              <ContactPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/team-profile/:id"
          element={
            <ProtectedRoute>
              <BlogHeader/>
              <ViewProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/blog/:id"
          element={
            <ProtectedRoute>
              <BlogHeader/>
              <BlogDetails />
            </ProtectedRoute>
          }
        />
        {/* Role-based Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard>
                <AdminMainSection />
              </AdminDashboard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/profile"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard>
                <Profile />
              </AdminDashboard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/create-new-admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard>
                <AddAdmin />
              </AdminDashboard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/messages"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard>
                <MessageList />
              </AdminDashboard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/analytics"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard>
                <AnalyticsDashboard />
              </AdminDashboard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/manage-users"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard>
                <ManageUsers />
              </AdminDashboard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/manage-blogs"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard>
                <BlogManager />
              </AdminDashboard>
            </ProtectedRoute>
          }
        />
        <Route path="/dashboard/blogs/:id"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard>
                <BlogDetails />
              </AdminDashboard>
            </ProtectedRoute>
          }
        />
        <Route path="/dashboard/message/:id"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard>
                <MessageDetails/>
              </AdminDashboard>
            </ProtectedRoute>
          }
        />
        <Route path="/unauthorized" element={<div>Access Denied</div>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

// App.jsx
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, clearMessage, getProfile } from "./store/slices/userSlice";
import LoginSection from "./pages/LoginSection";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./pages/ProtectedRoutes";
import AuthorDashboard from "./pages/AuthorDashboard";
import BlogPage from "./pages/BlogPage";
import Profile from "./components/sub-components/Profile";
import AdminMainSection from "./pages/AdminMainSection";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";

export default function App() {
  const dispatch = useDispatch();
  const { user, message, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

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
    if (error) {
      toast.error(error);
      const timeout = setTimeout(() => {
        dispatch(clearError());
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [error, dispatch]);

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

        {/* Role-based Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard>
                <AdminMainSection />
              </AdminDashboard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/profile"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard>
                <Profile />
              </AdminDashboard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/create-new-admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard>
                <Profile />
              </AdminDashboard>
            </ProtectedRoute>
          }
        />
        
        <Route

          path="/admin/alalystics"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard>
                <AnalyticsDashboard />
              </AdminDashboard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/author"
          element={
            <ProtectedRoute role="author">
              <AuthorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blog"
          element={
            <ProtectedRoute role="user">
              <BlogPage />
            </ProtectedRoute>
          }
        />

        {/* Role-based redirect from "/" */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              {user?.role === "admin" ? (
                <Navigate to="/admin" />
              ) : user?.role === "author" ? (
                <Navigate to="/author" />
              ) : (
                <Navigate to="/blog" />
              )}
            </ProtectedRoute>
          }
        />

        <Route path="/unauthorized" element={<div>Access Denied</div>} />
      </Routes>
    </BrowserRouter>
  );
}

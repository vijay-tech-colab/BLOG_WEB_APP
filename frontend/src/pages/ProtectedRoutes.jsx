// pages/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, role }) => {
  const { user} = useSelector((state) => state.user);


  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role && user.role !== "author" ) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

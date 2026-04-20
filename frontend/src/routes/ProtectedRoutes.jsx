import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoutes({ role }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && role !== user.role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoutes;

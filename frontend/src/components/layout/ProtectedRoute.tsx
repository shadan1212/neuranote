import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoggingOut } = useAuthStore();

  if (isLoggingOut) {
    return <Outlet />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;

import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../auth/auth";

const ProtectedRoute: React.FC = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;

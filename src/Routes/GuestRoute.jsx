import { Navigate, useLocation } from "react-router";
import { useAuth } from "../Context/AuthContext";

const GuestRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (isAuthenticated) {
    const from = location.state?.from?.pathname || "/";
    return <Navigate to={from} replace />;
  }

  return children;
};

export default GuestRoute;

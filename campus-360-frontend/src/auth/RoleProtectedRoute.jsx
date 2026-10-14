import { Navigate } from "react-router-dom";

import useAuth from "./useAuth";

const RoleProtectedRoute = ({
  children,
  allowedRoles,
}) => {

  const { user } = useAuth();

  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default RoleProtectedRoute;
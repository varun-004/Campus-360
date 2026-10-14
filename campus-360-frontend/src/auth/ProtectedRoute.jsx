import { Navigate } from "react-router-dom";

import useAuth from "./useAuth";

import Loader from "../components/ui/Loader";

const ProtectedRoute = ({ children }) => {

  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return user ? children : <Navigate to="/login" />;

};

export default ProtectedRoute;
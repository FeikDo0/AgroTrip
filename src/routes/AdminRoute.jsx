import { Navigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

function AdminRoute({ children }) {
  const { currentUser } = useAuth();

  const isAdmin = currentUser?.role === "admin";

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
}

export default AdminRoute;
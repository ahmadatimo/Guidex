import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { AuthContext } from "../context/AuthContext";


const ProtectedRoutes: React.FC<{ allowedRoles: string[] }> = ({ allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Spinner />;
  }

  if (!user) {
    console.log('User is not updated')
    return <Navigate to="/auth" />;
  }

  if (!allowedRoles.includes(user.role)) {

    if (["admin", "guide"].includes(user.role)) {
      return <Navigate to="/staff/home" replace />;
    }
    return <Navigate to="/visitor/home" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;

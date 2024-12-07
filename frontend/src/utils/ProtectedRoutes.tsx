import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Spinner from "../components/Spinner";

// Define the shape of your token payload if known
interface TokenPayload {
  user_id?: number;
  sub?: string;
  role?: string;
  exp?: number;
}

const ProtectedRoutes: React.FC<{ allowedRoles: string[] }> = ({ allowedRoles }) => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    if (!token) {
      // No token found, user not authenticated
      setUserRole(null);
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode<TokenPayload>(token);

      // Check if token is expired
      if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
        sessionStorage.removeItem("access_token");
        setUserRole(null);
      } else {
        const role = decoded.role || null;
        setUserRole(role);
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      setUserRole(null);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (!userRole) {
    // No valid role found, redirect to auth page
    return <Navigate to="/auth" />;
  }

  if (!allowedRoles.includes(userRole)) {
    // User's role is not in allowed roles, redirect to unauthorized page
    return <Navigate to="/unauthorized" />;
  }

  // Role is allowed, render protected route content
  return <Outlet />;
};

export default ProtectedRoutes;

import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getCurrRole } from "../utils/api";
import Spinner from "../components/Spinner";

const ProtectedRoutes: React.FC<{ allowedRoles: string[] }> = ({ allowedRoles }) => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        if (sessionStorage.getItem("access_token"))
        {
          const role = await getCurrRole();
          setUserRole(role);
        } else {
          setUserRole(null);
          console.log("user undefined")
        }
        
      } catch (error) {
        console.error("Error fetching user role:", error);
        setUserRole(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (!userRole) {
    return <Navigate to="/auth" />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;

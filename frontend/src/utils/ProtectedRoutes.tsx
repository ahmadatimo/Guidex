// src/components/ProtectedRoutes.tsx

import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoutes: React.FC = () => {
  const { accessToken } = useAuth(); // Get accessToken from AuthContext

  // Check if the user is authenticated
  if (!accessToken) {
    // Redirect to /auth if no accessToken
    return <Navigate to="/auth" />;
  }

  // If authenticated, render the Outlet (protected routes)
  return <Outlet />;
};

export default ProtectedRoutes;

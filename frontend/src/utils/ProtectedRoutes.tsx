

import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoutes: React.FC = () => {

  // Check if the user is authenticated
  if (!sessionStorage.getItem("access_token")) {
    // Redirect to /auth if no accessToken
    return <Navigate to="/auth" />;
  }

  // If authenticated, render the Outlet (protected routes)
  return <Outlet />;
};

export default ProtectedRoutes;

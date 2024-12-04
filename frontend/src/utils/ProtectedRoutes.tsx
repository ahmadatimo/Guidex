import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {

    // Check for the token in local storage
    const token = localStorage.getItem("access_token");

    
    return token? <Outlet /> : <Navigate to='/visitor/auth'/>
}

export default ProtectedRoutes;
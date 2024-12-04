import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
    const user = null // put user object from login session
    
    return user? <Outlet /> : <Navigate to='/visitor/auth'/>
}

export default ProtectedRoutes;
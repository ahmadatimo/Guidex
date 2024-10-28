import { Outlet } from 'react-router-dom'
// import NavBar from '../components/NavBar'
import { ToastContainer } from 'react-toastify'
import "react-toastify/ReactToastify.css";
import Sidebar from '../components/SideBar';

const MainLayout = () => {
    return (
        <>
            <Sidebar /> 
            <Outlet />
            <ToastContainer/>
        </>
    )
}

export default MainLayout
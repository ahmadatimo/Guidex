import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import "react-toastify/ReactToastify.css";
import Sidebar from '../components/SideBar';

const VisitorLayout = () => {
    return (
        <>
            <Sidebar />
            <Outlet />
            <ToastContainer/>
        </>
    )
}

export default VisitorLayout
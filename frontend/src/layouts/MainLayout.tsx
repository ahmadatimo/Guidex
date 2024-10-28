import { Outlet } from 'react-router-dom'
// import NavBar from '../components/NavBar'
import { ToastContainer } from 'react-toastify'
import "react-toastify/ReactToastify.css";
import SideBar from '../components/SideBar';

const MainLayout = () => {
    return (
        <>
            <SideBar /> 
            <Outlet />
            <ToastContainer/>
        </>
    )
}

export default MainLayout
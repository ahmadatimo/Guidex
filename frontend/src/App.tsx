import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import MyAppointments from "./pages/MyAppointments";
import NavBar from "./components/NavBar";
import Appointment from "./pages/Appointment";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./components/Footer";
import Login from "./pages/Login";

const App = () => {
  const location = useLocation();

  // Define routes that do not require NavBar and Footer
  const excludeNavAndFooterRoutes = ["/login"];

  const shouldShowNavAndFooter = !excludeNavAndFooterRoutes.includes(location.pathname);

  return (
    <div className="mx-4 sm:mx-[10%]">
      {/* Conditionally render NavBar and Footer */}
      {shouldShowNavAndFooter && <NavBar />}
      
      <Routes>
        {/* Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path='/appointment' element={<Appointment />} />
        <Route path='/login' element={<Login />} />
      </Routes>

      {shouldShowNavAndFooter && <Footer />}
  
      <ToastContainer />
    </div>
  );
};

export default App;

import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/User/Home";
import About from "./pages/User/About";
import Contact from "./pages/User/Contact";
import MyProfile from "./pages/User/MyProfile";
import MyAppointments from "./pages/User/MyAppointments";
import Appointment from "./pages/User/Appointment";
import VisitorLayout from "./layouts/VisitorLayout";
import StaffLayout from "./layouts/StaffLayout";
import MainLayout from "./layouts/MainLayout";
import StaffHomepage from "./pages/Staff/StaffHomePage";
import PendingApprovals from "./pages/Staff/PendingApprovals";
import Calendar from "./pages/Staff/Calendar";
import Notifications from "./pages/Staff/Notifications";
import Analytics from "./pages/Staff/Analytics";
import AddStaff from "./pages/Staff/AddStaff";
import StaffSettings from "./pages/Staff/StaffSettings";
import GuideAppointments from "./pages/Staff/GuideAppointments";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import AuthPage from "./pages/Auth";
import Spinner from "./components/Spinner";
import { AuthContext } from "./context/AuthContext";

const App = () => {

  const { user, loading } = useContext(AuthContext);
    
  const handleInvalidRoute = () => {
    if (loading) return <Spinner />;
    if (!user || !user.role) return <Navigate to="/auth" />;
  
    if (user.role === "visitor") return <Navigate to="/visitor/home" />;
    if (["admin", "guide"].includes(user.role)) return <Navigate to="/staff/home" />;
  };
  


  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to={user?.role ? `/${user.role}/home` : "/auth"} />} />

        {/* Visitor Routes */}
        <Route element={<MainLayout />}>
          <Route path="/auth" element={<AuthPage />} />

          {/* Protected Visitor Routes */}
          <Route element={<ProtectedRoutes allowedRoles={["visitor"]} />}>
            <Route element={<VisitorLayout />}>
              <Route path="/visitor/home" element={<Home />} />
              <Route path="/visitor/about" element={<About />} />
              <Route path="/visitor/contact" element={<Contact />} />
              <Route path="/visitor/my-profile" element={<MyProfile />} />
              <Route path="/visitor/my-appointments" element={<MyAppointments />} />
              <Route path="/visitor/appointment" element={<Appointment />} />
            </Route>
          </Route>

          {/* Protected Staff Routes */}
          <Route element={<ProtectedRoutes allowedRoles={["admin", "guide"]} />}>
            <Route element={<StaffLayout />}>
              <Route path="/staff/home" element={<StaffHomepage />} />
              <Route path="/staff/pending-approvals" element={<PendingApprovals />} />
              <Route path="/staff/calendar" element={<Calendar />} />
              <Route path="/staff/notifications" element={<Notifications />} />
              <Route path="/staff/analytics" element={<Analytics />} />
              <Route path="/staff/add-staff" element={<AddStaff />} />
              <Route path="/staff/settings" element={<StaffSettings />} />
              <Route path="/staff/appointments" element={<GuideAppointments />} />
            </Route>
          </Route>

          {/* Handle Invalid Routes */}
          <Route path="*" element={handleInvalidRoute()} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;

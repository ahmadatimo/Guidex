import { useEffect, useState } from "react";
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
import { getCurrRole } from "./utils/api";

const App = () => {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRole = async () => {
      const token = sessionStorage.getItem("access_token");
      if (!token) {
        setLoading(false);
        setRole(null);
        return;
      }

      try {
        const fetchedRole = await getCurrRole();
        setRole(fetchedRole);
      } catch (error) {
        console.error("Error fetching role:", error);
        setRole(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, []);

  const handleInvalidRoute = () => {
    if (loading) return <div>Loading...</div>; // Show loading until role is determined
    if (!role) return <Navigate to="/auth" />; // If no role, redirect to auth

    // Redirect to role-specific homepage
    if (role === "visitor") return <Navigate to="/visitor/home" />;
    if (["admin", "guide"].includes(role)) return <Navigate to="/staff/home" />;
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to={role ? `/${role}/home` : "/auth"} />} />

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

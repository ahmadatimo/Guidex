  import { Route, Routes } from "react-router-dom"
  import Home from "./pages/User/Home"
  import Login from "./pages/Login"
  import About from "./pages/User/About"
  import Contact from "./pages/User/Contact"
  import MyProfile from "./pages/User/MyProfile"
  import MyAppointments from "./pages/User/MyAppointments"
  import Appointment from "./pages/User/Appointment"
  import VisitorLayout from "./layouts/VisitorLayout"
  import StaffLayout from "./layouts/StaffLayout"
  import MainLayout from "./layouts/MainLayout"
  import StaffHomepage from "./pages/Staff/StaffHomePage"
  import PendingApprovals from "./pages/Staff/PendingApprovals"
  import Calendar from "./pages/Staff/Calendar"
  import Notifications from "./pages/Staff/Notifications"
  import Analytics from "./pages/Staff/Analytics"
  import AddStaff from "./pages/Staff/AddStaff"
  import StaffSettings from "./pages/Staff/StaffSettings"
  import GuideAppointments from "./pages/Staff/GuideAppointments"
  import ProtectedRoutes from "./utils/ProtectedRoutes"

  const App = () => {
    return (
      <div>
        <Routes>
          {/*Visitors */}
          <Route element={<MainLayout />} >
            <Route path='/visitor/auth' element={<Login/>}/>
            <Route element={<ProtectedRoutes/>}> 
              <Route element={<VisitorLayout />}>
                <Route path='/visitor' element={<Home/>}/>
                <Route path='/about' element={<About/>}/>
                <Route path='/contact' element={<Contact/>}/>
                <Route path='/my-profile' element={<MyProfile/>}/>
                <Route path='/my-appointments' element={<MyAppointments/>}/>
                <Route path='/appointment' element={<Appointment/>}/>
              </Route> {/*VisitorLayout */}

              {/*Staff */}
              <Route element={<StaffLayout />} >
                <Route path='/staff' element={<StaffHomepage />} />
                <Route path='/staff/pending-approvals' element={<PendingApprovals />} />
                <Route path='/staff/calendar' element={<Calendar />} />
                <Route path='/staff/notifications' element={<Notifications />}/>
                <Route path='/staff/analytics' element={<Analytics />} />
                <Route path='/staff/add-staff' element={<AddStaff />} />
                <Route path='/staff/settings' element={<StaffSettings />} />
                <Route path='/staff/appointments' element={<GuideAppointments />} />
              </Route> {/*StaffLayout */}
            </Route>
          </Route> {/*MainLayout */}
        </Routes>
      </div>
    )
  }

  export default App

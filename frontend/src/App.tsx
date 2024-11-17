import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import About from "./pages/About"
import Contact from "./pages/Contact"
import MyProfile from "./pages/MyProfile"
import MyAppointments from "./pages/MyAppointments"
import Appointment from "./pages/Appointment"
import VisitorLayout from "./layouts/VisitorLayout"
import StaffLayout from "./layouts/StaffLayout"
import MainLayout from "./layouts/MainLayout"
import StaffHomepage from "./pages/StaffHomePage"
import PendingApprovals from "./pages/PendingApprovals"
import Calendar from "./pages/Calendar"
import Notifications from "./pages/Notifications"
import Analytics from "./pages/Analytics"
import AddStaff from "./pages/AddStaff"
import StaffSettings from "./pages/StaffSettings"

const App = () => {
  return (
    <div>
      <Routes>
        {/*Visitors */}
        <Route element={<MainLayout />} >
          <Route element={<VisitorLayout />} >
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/my-profile' element={<MyProfile/>}/>
            <Route path='/my-appointments' element={<MyAppointments/>}/>
            <Route path='/appointment' element={<Appointment />} />
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
          </Route> {/*StaffLayout */}

        </Route> {/*MainLayout */}
      </Routes>
    </div>
  )
}

export default App
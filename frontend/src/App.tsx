  import { Navigate, Route, Routes } from "react-router-dom"
  import Home from "./pages/User/Home"
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
  import AuthPage from "./pages/Auth"


  const App = () => {
  
    const getInitialPath = (): string =>{
      let role = sessionStorage.getItem("role");
      let access_token = sessionStorage.getItem("access_token");

      if(role != null && access_token != null){
        return `/${role}/home`;
      }
      
      return "/auth";
    }


    return (
      <div>
        <Routes>
        <Route path="/" element={<Navigate to={getInitialPath()}/>} />
          {/*Visitors */}
          <Route element={<MainLayout />} >
          <Route path='/auth' element={<AuthPage/>}/>
            <Route element={<ProtectedRoutes/>}> 
              <Route element={<VisitorLayout />}>
                <Route path='/visitor/home' element={<Home/>}/>
                <Route path='/visitor/about' element={<About/>}/>
                <Route path='/visitor/contact' element={<Contact/>}/>
                <Route path='/visitor/my-profile' element={<MyProfile/>}/>
                <Route path='/visitor/my-appointments' element={<MyAppointments/>}/>
                <Route path='/visitor/appointment' element={<Appointment/>}/>
              </Route> {/*VisitorLayout */}

              {/*Staff */}
              <Route element={<StaffLayout />} >
                <Route path='/staff/home' element={<StaffHomepage />} />
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

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AuthPage from './pages/auth/AuthPage';
import StaffAuthPage from './staff/pages/auth/StaffAuthPage';
import StaffHomePage from './staff/pages/home/Home';
import RecoverEmail from './pages/auth/resetPass/RecoverEmail';
import UpdatePass from './pages/auth/resetPass/UpdatePass';
import DeleteUser from './visitors/pages/DeleteUser/DeleteUser';
import { DashboardContextProvider} from './ Constexts/context';
import VisitorAuthPage from './visitors/pages/auth/VisitorAuthPage';
import Home from './visitors/pages/home/Home';
import VisitorLayout from './layouts/VisitorLayout';
import Settings from './visitors/pages/settings/Settings';
import Profile from './visitors/pages/profile/Profile';

const App = () => {
  return(
    <DashboardContextProvider>
      <AppRoutes />
    </DashboardContextProvider>
  )
}

const AppRoutes = () => {
 
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        {/* General */}
        <Route index={true} element={<AuthPage />} />
        <Route path='/auth/RecoverEmail' element={<RecoverEmail />} />
        <Route path='/auth/UpdatePass' element={<UpdatePass />} />
        <Route path='/visitor/deleteUser' element={<DeleteUser />} />
        {/* Staff Pages */}
        <Route path='/staff/auth' element={<StaffAuthPage />} />
        <Route path='/staff/home' element={<StaffHomePage />} />
        {/* Visitor Pages*/}
        <Route path='/visitor' element={<VisitorLayout />} >
          <Route index element={<Home />} /> 
          <Route path='/visitor/home' element={<Home />} />
          <Route path='/visitor/settings' element={<Settings />} />
          <Route path='/visitor/profile' element={<Profile />} />
        </Route>
        <Route path='/visitor/auth' element={<VisitorAuthPage />} />
      </Route>
    )
  ); 

  return <RouterProvider router={router} />;
};

export default App;

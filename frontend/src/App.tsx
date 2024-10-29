import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import VisitorAuthPage from './visitors/pages/auth/VisitorAuthPage';
import AuthPage from './pages/auth/AuthPage';
import StaffAuthPage from './staff/pages/auth/StaffAuthPage';
import VisitorHomePage from './visitors/pages/home/Home';
import StaffHomePage from './staff/pages/home/Home';
import RecoverEmail from './pages/auth/resetPass/RecoverEmail';
import UpdatePass from './pages/auth/resetPass/UpdatePass';
import DeleteUser from './visitors/pages/DeleteUser/DeleteUser';
import VisitorLayout from './layouts/VisitorLayout';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index={true} element={<AuthPage />} />
        <Route path='/visitor/auth' element={<VisitorAuthPage />} />
        <Route path='/staff/auth' element={<StaffAuthPage />} />
        
        <Route path='/visitor' element={<VisitorLayout />} >
          <Route path='/visitor/home' element={<VisitorHomePage />} />
        </Route>
        
        <Route path='/staff/home' element={<StaffHomePage />} />
        <Route path='/auth/RecoverEmail' element={<RecoverEmail />} />
        <Route path='/auth/UpdatePass' element={<UpdatePass />} />
        <Route path='/visitor/deleteUser' element={<DeleteUser />} />

      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;

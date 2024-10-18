import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import VisitorAuthPage from './visitors/pages/auth/VisitorAuthPage';
import AuthPage from './pages/AuthPage';
import StaffAuthPage from './staff/pages/auth/StaffAuthPage';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index={true} element={<AuthPage />} />
        <Route path='/visitor/auth' element={<VisitorAuthPage />} />
        <Route path='/staff/auth' element={<StaffAuthPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;

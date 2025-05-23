// src/routes/DoctorRoutes.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const DoctorRoutes = () => {
  const { isLoggedIn , role } = useAuth();

  console.log("role",role)
  if ( !isLoggedIn || role !== 'doctor') {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default DoctorRoutes;

// src/routes/AdminRoutes.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const AdminRoutes = () => {
  const { isLoggedIn , role } = useAuth();

  console.log("role",role)
  if ( !isLoggedIn || role !== 'admin') {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default AdminRoutes;

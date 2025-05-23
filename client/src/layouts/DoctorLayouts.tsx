// src/layouts/AdminLayout.tsx
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/DoctorSideBar';

const DoctorLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100 min-h-screen">
        <Outlet /> {/* This renders nested routes like Dashboard, Doctors, etc. */}
      </main>
    </div>
  );
};

export default DoctorLayout;

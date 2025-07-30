// App.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; 

import Home from './pages/user/Homepage';
import Appointment from './pages/user/Appointment';
import Login from './pages/login/Login';
import UserSignup from './pages/register/UserSignup';
import Otp from './pages/otp/Otp';
import Navbar from './components/Navbar';
import DoctorRegister from './pages/doctor/DoctorRegister';

import AdminLayout from './layouts/AdminLayouts';
import Dashboard from './pages/admin/Dashboard';
import AdminRoutes from './routes/AdminRoutes';
import Department from './pages/admin/Department';
import DoctorRoutes from './routes/DoctorRoutes';
import DoctorLayout from './layouts/DoctorLayouts';
import Schedules from './pages/doctor/Schedules';
import DocDashboard from './pages/doctor/Dashboard';
import Patients from './pages/admin/Patients';
import AppointmentSchedule from './pages/doctor/Appointment';
import DoctorLogin from './pages/doctor/DoctorLogin';
import DoctorVerification from './pages/admin/DoctorVerification';
import DoctorManagement from './pages/admin/DoctorManagement';

import UserLayout from './layouts/user/ProfileLayout';
import UpdateDetails from './pages/user/profile/UpdateDetails';
import Bookings from './pages/user/profile/Bookings';
import Prescriptions from './pages/user/profile/Prescriptions';
import Chats from './pages/user/profile/Chats';
import Wallet from './pages/user/profile/Wallet';
import Services from './pages/user/Services';
import DepartmentDoctorsPage from './pages/user/DepartmentDoctor';
import DoctorDetailsPage from './pages/user/DoctorDetails';
import Profile from './pages/doctor/Profile';
import AdminWallet from './pages/admin/AdminWallet';

function App() {
  return (
    <>
      <Navbar />

      {/* ✅ Global Toast Notification */}
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<Otp />} />
        <Route path="/doctor-signup" element={<DoctorRegister />} />
        <Route path="/doctor-login" element={<DoctorLogin />} />
        <Route path="/services" element={<Services/>} />
        <Route path="/department/:id" element={<DepartmentDoctorsPage />} />
        <Route path="/doctor/:id" element={<DoctorDetailsPage />} />
        

        {/* USER PROFILE NESTED ROUTES */}
        <Route path="/profile" element={<UserLayout />}>
          <Route index element={<Navigate to="update" />} />
          <Route path="update" element={<UpdateDetails />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="prescriptions" element={<Prescriptions />} />
          <Route path="chats" element={<Chats />} />
          <Route path="wallet" element={<Wallet />} />
        </Route>

        {/* PROTECTED ADMIN ROUTES */}
        <Route element={<AdminRoutes />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="doctors" element={<DoctorManagement />} />
            <Route path="patients" element={<Patients />} />
            <Route path="department" element={<Department />} />
            <Route path="doctor-verification" element={<DoctorVerification />} />
            <Route path="wallet" element={<AdminWallet />} />
          </Route>
        </Route>

        {/* PROTECTED DOCTOR ROUTES */}
        <Route element={<DoctorRoutes />}>
          <Route path="/doctor" element={<DoctorLayout />}>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<DocDashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="appointment" element={<AppointmentSchedule />} />
            <Route path="schedules" element={<Schedules />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;

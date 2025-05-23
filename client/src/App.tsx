// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/user/Homepage';
import Appointment from './pages/user/Appointment';
import Profile from './pages/user/Profile';
import Login from './pages/login/Login';
import UserSignup from './pages/register/UserSignup';
import Otp from './pages/otp/Otp';
import Navbar from './components/Navbar';
import DoctorRegister from './pages/doctor/DoctorRegister';


import AdminLayout from './layouts/AdminLayouts';
import Dashboard from './pages/admin/Dashboard';
import Doctors from './pages/admin/Doctors';
import AdminRoutes from './routes/AdminRoutes'; // Protected route component
import Department from './pages/admin/Department';
import DoctorRoutes from './routes/DoctorRoutes';
import DoctorLayout from './layouts/DoctorLayouts';
import Schedules from './pages/doctor/Schedules';
import DocDashboard from './pages/doctor/Dashboard';
import Patients from './pages/admin/Patients';
import AppointmentSchedule from './pages/doctor/Appointment';

function App() {
  return (
    <>
      <Navbar />

     <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<Otp />} />
        <Route path="/doctor-signup" element={<DoctorRegister />} />

        {/* PROTECTED ADMIN ROUTES */}
        <Route element={<AdminRoutes />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="doctors" element={<Doctors />} />
            <Route path="patients" element={<Patients />} />
            <Route path="department" element={<Department />} />
          </Route>
        </Route>


          {/* Protected doctor routes */}
          <Route element={<DoctorRoutes />}>
          <Route path="/doctor" element={<DoctorLayout />}>
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

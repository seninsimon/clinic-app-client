// App.tsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/user/Homepage';
import Appointment from './pages/user/Appointment';
import Profile from './pages/user/Profile';
import Login from './pages/login/Login';
import UserSignup from './pages/register/UserSignup';
import Otp from './pages/otp/Otp';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<Otp />} />
      </Routes>
    </>
  );
}

export default App;

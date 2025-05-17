// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/user/Homepage';
import Appointment from './pages/user/Appointment';
import Profile from './pages/user/Profile';
import Login from './pages/login/Login';
import UserSignup from './pages/register/UserSignup';
import Otp from './pages/otp/Otp';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<Otp />} />
      </Routes>
    </Router>
  );
}

export default App;
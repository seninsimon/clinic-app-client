// src/components/Navbar.tsx
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Navbar: React.FC = () => {
  const { isLoggedIn, logout , isAdmin , isDoctor } = useAuth();
  const navigate = useNavigate();
 
  


  const handleLogout = () => {
    logout();
    navigate("/login");
    
  };






  return (
    <nav className="bg-white shadow-lg p-4 flex justify-between">
      <Link to="/" className="text-2xl font-bold text-blue-600">Amazing Care</Link>
      <div className="flex space-x-4 items-center">
        <Link to="/" className="hover:text-blue-600">Home</Link>
       {
        isAdmin ?  <Link to="/admin/dashboard" className="hover:text-blue-600">Admin panel</Link> : ""
       }
        {
        isDoctor ?  <Link to="/doctor/dashboard" className="hover:text-blue-600">Doctor panel</Link> : ""
       }
        <Link to="/appointment" className="hover:text-blue-600">book Appointment</Link>
        {isDoctor ? "" : <Link to="/profile" className="hover:text-blue-600">Profile</Link>}
        {isLoggedIn ? (
          <button onClick={handleLogout} className="hover:text-blue-600">Logout</button>
        ) : (
          <Link to="/login" className="hover:text-blue-600">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

// components/Navbar.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage login state

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Add your logout logic here (e.g., clear tokens, redirect)
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - Brand Name */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              Amazing Care
            </Link>
          </div>

          {/* Right side - Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link
              to="/appointment"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Appointment
            </Link>
            <Link
              to="/profile"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Profile
            </Link>

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
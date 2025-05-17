// components/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Amazing Care</h3>
            <p className="text-gray-400">
              Providing quality healthcare with care and compassion.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/appointment" className="text-gray-400 hover:text-white">
                  Appointment
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-400 hover:text-white">
                  Profile
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-400">
              Email: support@amazingcare.com
              <br />
              Phone: (123) 456-7890
            </p>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400">
          © {new Date().getFullYear()} Amazing Care. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
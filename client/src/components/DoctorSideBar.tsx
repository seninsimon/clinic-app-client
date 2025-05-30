// src/components/Sidebar.tsx
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { path: '/doctor/dashboard', name: 'Dashboard' },
    { path: '/doctor/profile', name: 'Profile' },
    { path: '/doctor/appointment', name: 'Appointments' },
    { path: '/doctor/schedules', name: 'Time Schedules' },
    
  ];

  return (
    <div className="w-64 h-screen bg-blue-900 text-white p-4">
      <h2 className="text-2xl font-bold mb-6">Doctor Panel</h2>
      <nav className="space-y-2">
        {links.map(link => (
          <Link
            key={link.path}
            to={link.path}
            className={`block px-3 py-2 rounded ${
              location.pathname === link.path ? 'bg-blue-700' : 'hover:bg-blue-700'
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;

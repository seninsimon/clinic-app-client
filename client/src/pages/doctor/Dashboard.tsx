import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarCheck, FaUserCircle, FaStethoscope } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";

const DocDashboard: React.FC = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: "Appointments",
      icon: <FaCalendarCheck size={28} />,
      description: "See your upcoming bookings",
      link: "/doctor/appointments",
    },
    {
      title: "Pending Approvals",
      icon: <MdPendingActions size={28} />,
      description: "View patients waiting for approval",
      link: "/doctor/pending",
    },
    {
      title: "My Profile",
      icon: <FaUserCircle size={28} />,
      description: "Manage your profile and info",
      link: "/doctor/profile",
    },
    {
      title: "Specializations",
      icon: <FaStethoscope size={28} />,
      description: "Update your medical expertise",
      link: "/doctor/specializations",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Doctor Dashboard
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {sections.map((section, idx) => (
          <div
            key={idx}
            onClick={() => navigate(section.link)}
            className="cursor-pointer bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-4 mb-4 text-blue-600">
              {section.icon}
              <h3 className="text-xl font-semibold">{section.title}</h3>
            </div>
            <p className="text-sm text-gray-600">{section.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocDashboard;

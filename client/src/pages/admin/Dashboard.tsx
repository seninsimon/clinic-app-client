import React, { useState, useEffect } from "react";
import { FaUserMd, FaCalendarCheck, FaUsers, FaBell } from "react-icons/fa";

// Define interfaces for type safety
interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
}

interface Appointment {
  id: string;
  patient: string;
  doctor: string;
  time: string;
  status: "pending" | "confirmed" | "cancelled";
}

interface Notification {
  id: string;
  message: string;
  timestamp: string;
}

// Dummy data (replace with API calls)
const dummyStats = [
  { title: "Total Patients", value: 1200, icon: <FaUsers />, color: "bg-blue-500" },
  { title: "Appointments Today", value: 45, icon: <FaCalendarCheck />, color: "bg-green-500" },
  { title: "Doctors Online", value: 12, icon: <FaUserMd />, color: "bg-purple-500" },
];

const dummyAppointments: Appointment[] = [
  { id: "1", patient: "John Doe", doctor: "Dr. Smith", time: "10:00 AM", status: "confirmed" },
  { id: "2", patient: "Jane Roe", doctor: "Dr. Adams", time: "11:30 AM", status: "pending" },
];

const dummyNotifications: Notification[] = [
  { id: "1", message: "New patient registered: Alice Brown", timestamp: "2025-05-19 10:30 AM" },
  { id: "2", message: "Appointment cancelled by Dr. Smith", timestamp: "2025-05-19 09:15 AM" },
];

// Stat Card Component
const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
    <div className={`p-3 rounded-full ${color} text-white`}>{icon}</div>
    <div>
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      <p className="text-2xl font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);

// Appointments Table Component
const AppointmentsTable: React.FC<{ appointments: Appointment[] }> = ({ appointments }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-lg font-semibold mb-4">Recent Appointments</h2>
    <table className="w-full text-left">
      <thead>
        <tr className="text-gray-600">
          <th className="pb-2">Patient</th>
          <th>Doctor</th>
          <th>Time</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {appointments.map((appt) => (
          <tr key={appt.id} className="border-t">
            <td className="py-2">{appt.patient}</td>
            <td>{appt.doctor}</td>
            <td>{appt.time}</td>
            <td>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  appt.status === "confirmed"
                    ? "bg-green-100 text-green-800"
                    : appt.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {appt.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Notifications Component
const Notifications: React.FC<{ notifications: Notification[] }> = ({ notifications }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-lg font-semibold mb-4 flex items-center">
      <FaBell className="mr-2" /> Notifications
    </h2>
    <ul className="space-y-3">
      {notifications.map((notif) => (
        <li key={notif.id} className="text-sm text-gray-600">
          <p>{notif.message}</p>
          <p className="text-xs text-gray-400">{notif.timestamp}</p>
        </li>
      ))}
    </ul>
  </div>
);

// Main Dashboard Component
const Dashboard: React.FC = () => {
  const [stats, setStats] = useState(dummyStats);
  const [appointments, setAppointments] = useState<Appointment[]>(dummyAppointments);
  const [notifications, setNotifications] = useState<Notification[]>(dummyNotifications);

  // Simulate API fetching (replace with real API calls)
  useEffect(() => {
    // TODO: Integrate with API (e.g., Axios, React Query)
    // Example: fetchStats().then(setStats);
    // For real-time updates, consider WebSocket or Server-Sent Events
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-sm text-gray-600">Manage your clinic operations efficiently</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Appointments Section */}
        <div className="lg:col-span-2">
          <AppointmentsTable appointments={appointments} />
        </div>

        {/* Notifications Section */}
        <div className="lg:col-span-1">
          <Notifications notifications={notifications} />
        </div>
      </div>

      {/* Placeholder for Future Analytics Chart */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Analytics Overview</h2>
        <p className="text-gray-600">
          {/* Placeholder for Chart.js or Recharts integration */}
          Analytics charts (e.g., appointment trends, patient demographics) will be added here.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
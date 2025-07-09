import { NavLink, Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-5 shadow-md border-r">
        <h2 className="text-xl font-bold mb-6">User Profile</h2>
        <nav className="space-y-3">
          <NavLink
            to="/profile/update"
            className={({ isActive }) =>
              `block p-2 rounded ${
                isActive ? "bg-blue-200" : "hover:bg-blue-100"
              }`
            }
          >
            Update Details
          </NavLink>
          <NavLink
            to="/profile/bookings"
            className={({ isActive }) =>
              `block p-2 rounded ${
                isActive ? "bg-blue-200" : "hover:bg-blue-100"
              }`
            }
          >
            Bookings
          </NavLink>
          <NavLink
            to="/profile/prescriptions"
            className={({ isActive }) =>
              `block p-2 rounded ${
                isActive ? "bg-blue-200" : "hover:bg-blue-100"
              }`
            }
          >
            Prescriptions
          </NavLink>
          <NavLink
            to="/profile/chats"
            className={({ isActive }) =>
              `block p-2 rounded ${
                isActive ? "bg-blue-200" : "hover:bg-blue-100"
              }`
            }
          >
            Chats
          </NavLink>
          <NavLink
            to="/profile/wallet"
            className={({ isActive }) =>
              `block p-2 rounded ${
                isActive ? "bg-blue-200" : "hover:bg-blue-100"
              }`
            }
          >
            Wallet
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;

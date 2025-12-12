import React from "react";
import { Link, NavLink } from "react-router";
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  Package,
  BarChart3,
  PackagePlus,
} from "lucide-react";

const Aside = ({ onLogout }) => {
  return (
    <aside className="min-h-screen w-64 bg-white border-r shadow-sm flex flex-col fixed lg:static z-20">
      {/* Logo */}
      <div className="px-6 py-4 border-b">
        <h1 className="text-xl font-bold tracking-wide">Admin Panel</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1">
        <NavItem to="/dashboard" icon={<LayoutDashboard />} label="Dashboard" />
        <NavItem
          to="/dashboard/add-products"
          icon={<Package />}
          label="Add Products"
        />
        <NavItem
          to="/dashboard/manage-products"
          icon={<BarChart3 />}
          label="Manage Products"
        />
        <NavItem to="/admin/users" icon={<Users />} label="Users" />
        <NavItem
          to="/dashboard/settings"
          icon={<Settings />}
          label="Settings"
        />
      </nav>

      {/* Footer — Always stays at the bottom */}
      <div className="px-4 py-4 border-t">
        <button
          onClick={onLogout}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-red-600 hover:bg-red-100 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

// Reusable NavItem Component
const NavItem = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
        isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-blue-100"
      }`
    }
  >
    {icon}
    <span className="font-medium">{label}</span>
  </NavLink>
);

export default Aside;

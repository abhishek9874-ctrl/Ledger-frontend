import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

import {
  Landmark,
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  Repeat,
  FileText,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";

function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Mobile Navbar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">

        <h1 className=" flex gap-2 text-xl font-bold text-blue-600">
          <Landmark className="text-blue-600" />
          Backend Ledger
        </h1>

        <button onClick={() => setIsOpen(true)}>
          <Menu size={28} />
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
    fixed top-0 left-0 z-50
    w-64 h-screen bg-white border-r border-gray-200
    flex flex-col justify-between
    transition-transform duration-300
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0 md:sticky md:top-0
  `}
      >
        {/* Top Section */}
        <div>
          {/* Logo */}
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <Landmark className="text-blue-600" />
            <h1 className="text-2xl font-bold text-blue-600">
              Backend Ledger
            </h1>

            <button
              className="md:hidden"
              onClick={() => setIsOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation */}
          <div className="p-4 space-y-2">

            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-4 py-3 rounded-xl ${isActive
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "hover:bg-gray-100"
                }`
              }
            >
              <LayoutDashboard size={20} />
              Dashboard
            </NavLink>

            <NavLink
              to="/accounts"
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${location.pathname === "/accounts" ||
                location.pathname.startsWith("/viewdetails")
                ? "bg-blue-50 text-blue-600 font-medium"
                : "hover:bg-gray-100"
                }`}
            >
              <Wallet size={20} />
              Accounts
            </NavLink>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100">
              <ArrowLeftRight size={20} />
              Transactions
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100">
              <Repeat size={20} />
              Transfers
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100">
              <FileText size={20} />
              Reports
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100">
              <User size={20} />
              Profile
            </button>

          </div>
        </div>

        {/* Bottom */}
        <div className="p-4 border-t border-gray-200">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default SideBar;
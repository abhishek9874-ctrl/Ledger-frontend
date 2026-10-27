import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";

import { Landmark, LayoutDashboard, Wallet, ArrowLeftRight, Repeat, FileText, User, LogOut, Menu, X, } from "lucide-react";

function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("Name");
      navigate("/login", { replace: true });
    }
  };

  return (
    <>
      {/* Mobile Navbar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">

        <h1 className=" flex gap-2 text-xl font-bold text-blue-600">
          <Landmark className="text-blue-600" />
          LEDGERLY
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
          <div className="p-6  border-gray-200 flex items-center justify-between">
            <Landmark className="text-blue-600" />
            <h1 className="text-2xl font-bold text-blue-600">
              LEDGERLY
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

            <NavLink
              to="/transactions"
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-4 py-3 rounded-xl ${isActive
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "hover:bg-gray-100"
                }`
              }
            >
              <ArrowLeftRight size={20} />
              Transactions
            </NavLink>

            <NavLink
              to="/transfer"
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-4 py-3 rounded-xl ${isActive
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "hover:bg-gray-100"
                }`
              }
            >
              <Repeat size={20} />
              Transfer
            </NavLink>

            {user?.systemUser === true && (
              <NavLink
                to="/create-initial-fund"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 px-4 py-3 rounded-xl ${isActive
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "hover:bg-gray-100"
                  }`
                }
              >
                <Landmark size={20} />
                Create Initial Funds
              </NavLink>
            )}



            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-4 py-3 rounded-xl ${isActive
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "hover:bg-gray-100"
                }`
              }
            >
              <User size={20} />
              Profile
            </NavLink>

          </div>
        </div>

        {/* Bottom */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">

          <div className="w-full max-w-md bg-white rounded-3xl p-7 shadow-2xl">

            <div className="flex items-center justify-center mb-5">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                <LogOut
                  size={30}
                  className="text-red-500"
                />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-center text-slate-900">
              Are you sure?
            </h2>

            <p className="text-gray-500 text-center mt-3">
              Are you sure you want to logout from Backend Ledger?
            </p>

            <div className="flex gap-4 mt-7">

              {/* No */}
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 px-5 py-3 rounded-xl border border-gray-200 font-medium text-gray-700 hover:bg-gray-100 transition"
              >
                No
              </button>

              {/* Yes */}
              <button
                onClick={handleLogout}
                className="flex-1 px-5 py-3 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition"
              >
                Yes, Logout
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
}

export default SideBar;
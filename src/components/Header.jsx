import React from "react";
import { Bell } from "lucide-react";
const user = JSON.parse(localStorage.getItem("user"));

function Header() {
  return (
    <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 md:py-6 flex items-center justify-between">

      {/* Left Side */}
      <h1 className="text-2xl md:text-4xl font-bold text-slate-900">
        Dashboard
      </h1>

      {/* Right Side */}
      <div className="flex items-center gap-3 md:gap-6">

        {/* Notification */}
        <div className="relative cursor-pointer">
          <Bell size={24} className="text-slate-600 md:w-7 md:h-7" />

          <span className="absolute -top-1 -right-1 w-2 h-2 md:w-3 md:h-3 bg-blue-600 rounded-full"></span>
        </div>

        {/* User */}
        <div className="flex items-center gap-2 md:gap-3 cursor-pointer">

          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          {/* Hide username on mobile */}
          <span className="hidden md:block text-lg font-medium">
            {user?.name}
          </span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 md:w-5 md:h-5 text-slate-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>

        </div>

      </div>

    </div>
  );
}

export default Header;
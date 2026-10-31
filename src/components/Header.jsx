import React, { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { useLocation,useNavigate } from "react-router-dom";
import api from "../api/axios";

function Header() {
  const navigate=useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {

        const response = await api.get(
          "/account/profile",
        );

        setUser(response.data.account.user);

      } catch (err) {
        console.log(err.response?.data);
      }
    };

    fetchProfile();
  }, []);




  const location = useLocation();
  const pageTitle =
    location.pathname === "/dashboard"
      ? "Dashboard"
      : location.pathname === "/accounts"
        ? "Accounts"
        : location.pathname === "/transactions"
          ? "Transactions"
          : location.pathname.startsWith("/viewdetails")
            ? "Account Details"
            : location.pathname === "/transfer"
              ? "Transfer Money"
              : location.pathname === "/profile"
                ? "Profile"
                : location.pathname === "/create-initial-fund"
                  ? "Create Initial Funds"
                  : "Backend Ledger";
  return (
    <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 md:py-6 flex items-center justify-between">

      {/* Left Side */}
      <h1 className="text-2xl md:text-4xl font-bold text-slate-900">
        {pageTitle}
      </h1>

      {/* Right Side */}
      <div className="flex items-center gap-3 md:gap-6">


        {/* User */}
        <div onClick={()=>navigate("/profile")}>
          <div className="flex items-center gap-2 md:gap-3 cursor-pointer">

          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          {/* Hide username on mobile */}
          <span className="hidden md:block text-lg font-medium">
            {user?.name}
          </span>
        </div>

          

        </div>

      </div>

    </div>
  );
}

export default Header;
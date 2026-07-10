import React from 'react'
import SideBar from '../components/SideBar'
import Header from '../components/Header'
import { Mail, Phone, CalendarDays, Clock3, UserRound, Pencil, Lock } from "lucide-react";

function Profile() {
    return (
        <div className='flex flex-col md:flex-row min-h-screen bg-gray-50'>
            <SideBar />
            <div className='flex-1 bg-gray-50'>
                <Header />
                <div className="max-w-5xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
                <div className="bg-white  rounded-3xl shadow-sm border border-gray-100 p-8">

                    <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-10 lg:gap-20">

                        {/* Left Side */}
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">

                            {/* Avatar */}
                            <div className="relative">

                                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-blue-50 flex items-center justify-center">

                                    <span className="text-4xl sm:text-5xl font-bold text-blue-600">
                                        AK
                                    </span>

                                </div>

                            </div>

                            {/* User Info */}
                            <div>

                                <div className="flex items-center gap-2">

                                    <h2 className="text-2xl sm:text-3xl font-bold">
                                        Abhishek Kumar
                                    </h2>

                                    <UserRound
                                        className="text-blue-600"
                                        size={20}
                                    />

                                </div>

                                <span className="inline-block mt-2 px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-medium">
                                    Premium User
                                </span>

                                <div className="mt-5 space-y-4">

                                    <div className="flex items-center gap-3">

                                        <Mail
                                            size={18}
                                            className="text-gray-500"
                                        />

                                        <span className="text-gray-700">
                                            abhishek@gmail.com
                                        </span>

                                    </div>

                                    <div className="flex items-center gap-3">

                                        <Phone
                                            size={18}
                                            className="text-gray-500"
                                        />

                                        <span className="text-gray-700">
                                            +91 9876543210
                                        </span>

                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* Divider */}
                        <div className="hidden lg:block h-32 w-px bg-gray-200"></div>

                        {/* Right Side */}
                        <div className="space-y-6 w-full lg:w-auto">

                            <div className="flex items-center gap-4 justify-center lg:justify-start">

                                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">

                                    <CalendarDays
                                        className="text-blue-600"
                                        size={22}
                                    />

                                </div>

                                <div>

                                    <p className="text-gray-500 text-sm">
                                        Member since
                                    </p>

                                    <h4 className="font-semibold text-lg">
                                        12 Jan 2025
                                    </h4>

                                </div>

                            </div>

                            <div className="flex items-center gap-4 justify-center lg:justify-start">

                                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">

                                    <Clock3
                                        className="text-purple-600"
                                        size={22}
                                    />

                                </div>

                                <div>

                                    <p className="text-gray-500 text-sm">
                                        Last Login
                                    </p>

                                    <h4 className="font-semibold text-lg">
                                        6 Jun 2026, 10:30 PM
                                    </h4>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Buttons */}

                    <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-10">

                        <button className="w-full sm:w-auto px-8 py-3 border-2 border-blue-500 rounded-xl text-blue-600 font-semibold flex items-center gap-2 hover:bg-blue-50 transition">

                            <Pencil size={18} />

                            Edit Profile

                        </button>

                        <button className="w-full sm:w-auto px-8 py-3 border-2 border-purple-500 rounded-xl text-purple-600 font-semibold flex items-center gap-2 hover:bg-purple-50 transition">

                            <Lock size={18} />

                            Change Password

                        </button>

                    </div>

                </div>
              </div>
            </div>
        </div>
    )
}

export default Profile

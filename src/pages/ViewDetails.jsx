import React from 'react'
import SideBar from '../components/SideBar'
import Header from '../components/Header'
import { Info } from "lucide-react";
import { Wallet } from "lucide-react";
import {
    IdCard,
    IndianRupee,
    Calendar,
    ShieldCheck,
    Clock3
} from "lucide-react";
import {
    ArrowDown,
    ArrowUp,
    BarChart3
} from "lucide-react";

function ViewDetails() {
    return (
        <div className='flex flex-col md:flex-row min-h-screen bg-gray-50'>
            <SideBar />
            <div className='flex-1 bg-gray-50'>
                <Header />

                <div className="bg-gradient-to-r from-slate-50 to-blue-100 border hover:scale-[1.01]  md:m-6 m-4 border-gray-200 rounded-3xl p-8 flex items-center justify-between overflow-hidden hover:shadow-lg transition-all duration-300">

                    {/* Left Side */}
                    <div>
                        <p className="text-gray-500 text-xl">
                            Current Balance
                        </p>

                        <h1 className="text-6xl font-bold mt-3">
                            ₹11,000
                        </h1>

                        <span className="inline-block mt-4 bg-blue-100 text-blue-600 px-4 py-2 rounded-xl font-medium">
                            Available Balance
                        </span>
                    </div>

                    {/* Right Side */}
                    <div className="hidden md:flex w-24 h-24 rounded-3xl bg-white border border-gray-200 items-center justify-center shadow-sm">

                        <Wallet size={55} className="text-blue-700" />

                    </div>

                </div>
                <div className=" hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-100 hover:scale-[1.01]  bg-white border md:m-6 m-4 hover:shadow-lg  transition-all duration-300 border-gray-200 rounded-3xl p-8 mt-8">

                    <h2 className="text-3xl font-bold mb-8">
                        Account Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                        {/* Left Side */}
                        <div className="space-y-8">

                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
                                    <IdCard className="text-blue-600" size={28} />
                                </div>

                                <div>
                                    <p className="text-gray-500">Account ID</p>
                                    <h4 className="font-semibold break-all">
                                        61abeb5edab93690ea01de7c
                                    </h4>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
                                    <IndianRupee className="text-blue-600" size={28} />
                                </div>

                                <div>
                                    <p className="text-gray-500">Currency</p>
                                    <h4 className="font-semibold">
                                        INR
                                    </h4>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
                                    <Calendar className="text-blue-600" size={28} />
                                </div>

                                <div>
                                    <p className="text-gray-500">Created On</p>
                                    <h4 className="font-semibold">
                                        31 May 2026
                                    </h4>
                                </div>
                            </div>

                        </div>

                        {/* Right Side */}
                        <div className="space-y-8">

                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
                                    <ShieldCheck className="text-blue-600" size={28} />
                                </div>

                                <div>
                                    <p className="text-gray-500">
                                        Account Status
                                    </p>

                                    <span className="bg-green-100 text-green-700 px-4 py-1 rounded-xl font-medium">
                                        ACTIVE
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
                                    <Clock3 className="text-blue-600" size={28} />
                                </div>

                                <div>
                                    <p className="text-gray-500">
                                        Last Updated
                                    </p>

                                    <h4 className="font-semibold">
                                        20 Jun 2026, 10:30 AM
                                    </h4>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:m-6 m-4">

                    {/* Total Credits */}
                    <div className="bg-green-50 hover:bg-gradient-to-r hover:from-green-50 hover:to-green-100 border hover:scale-[1.01] border-gray-200 rounded-3xl p-6 flex items-center gap-5 hover:shadow-lg transition-all duration-300">

                        <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center">
                            <ArrowDown size={35} className="text-green-600" />
                        </div>

                        <div>
                            <p className="text-xl font-semibold">
                                Total Credits
                            </p>

                            <h3 className="text-4xl font-bold text-green-600 mt-1">
                                ₹48,000
                            </h3>

                            <p className="text-gray-500 mt-1">
                                All time
                            </p>
                        </div>

                    </div>

                    {/* Total Debits */}
                    <div className="bg-red-50 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-50 hover:scale-[1.01] border border-gray-200 rounded-3xl p-6 flex items-center gap-5 hover:shadow-lg transition-all duration-300">

                        <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center">
                            <ArrowUp size={35} className="text-red-500" />
                        </div>

                        <div>
                            <p className="text-xl font-semibold">
                                Total Debits
                            </p>

                            <h3 className="text-4xl font-bold text-red-500 mt-1">
                                ₹37,000
                            </h3>

                            <p className="text-gray-500 mt-1">
                                All time
                            </p>
                        </div>

                    </div>

                    {/* Net Balance */}
                    <div className="bg-purple-50 hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-100 hover:scale-[1.01] border border-gray-200 rounded-3xl p-6 flex items-center gap-5 hover:shadow-lg transition-all duration-300">

                        <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center">
                            <BarChart3 size={35} className="text-purple-600" />
                        </div>

                        <div>
                            <p className="text-xl font-semibold">
                                Net Balance
                            </p>

                            <h3 className="text-4xl font-bold text-purple-600 mt-1">
                                ₹11,000
                            </h3>

                            <p className="text-gray-500 mt-1">
                                All time
                            </p>
                        </div>

                    </div>

                </div>
                <div className="md:m-6 m-4 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl p-5 flex items-center gap-4 hover:shadow-md  transition-all duration-300">

                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                        <Info size={22} className="text-amber-600" />
                    </div>

                    <p className="text-amber-800 text-lg">
                        This is your primary account. You can view all your account related details here.
                    </p>

                </div>
            </div>

        </div>
    )
}

export default ViewDetails

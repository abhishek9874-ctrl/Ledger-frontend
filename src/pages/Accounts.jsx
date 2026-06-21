import React from 'react'
import SideBar from '../components/SideBar'
import Header from '../components/Header'
import {
    Landmark,
    Wallet,
    BadgeCheck,
    Clock3
} from "lucide-react";

function Accounts() {
    return (
        <div className='flex flex-col md:flex-row min-h-screen bg-gray-50'>
            <SideBar />

            <div className='flex-1 bg-gray-50'>
                <Header />

                <h1 className='md:text-3xl text-xl font-semibold md:px-10 px-2 md:py-10 md:mt-5 mt-10 mb-10 md:mb-5'>Manage All Your accounts here...!!!</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                    {/* Total Accounts */}
                    <div className="bg-white border border-gray-200 rounded-3xl px-8 py-7 flex items-center gap-5 hover:shadow-md transition">
                        <div className="w-20 h-20 rounded-2xl bg-blue-100 flex items-center justify-center">
                            <Landmark size={40} className="text-blue-600" />
                        </div>

                        <div>
                            <p className="text-gray-500">
                                Total Accounts
                            </p>

                            <h2 className="text-3xl font-bold mt-1">
                                3
                            </h2>
                        </div>
                    </div>

                    {/* Total Balance */}
                    <div className="bg-white border border-gray-200 rounded-3xl px-8 py-8 min-h-[140px] flex items-center gap-6 hover:shadow-md transition">
                        <div className="w-20 h-20 rounded-2xl bg-green-100 flex items-center justify-center">
                            <Wallet size={40} className="text-green-600" />
                        </div>

                        <div>
                            <p className="text-gray-500">
                                Total Balance
                            </p>

                            <h2 className="text-3xl font-bold text-green-600 mt-1">
                                ₹1,57,000
                            </h2>
                        </div>
                    </div>

                    {/* Active Accounts */}
                    <div className="bg-white border border-gray-200 rounded-3xl px-8 py-7 flex items-center gap-5 hover:shadow-md transition">
                        <div className="w-20 h-20 rounded-2xl bg-purple-100 flex items-center justify-center">
                            <BadgeCheck size={40} className="text-purple-600" />
                        </div>

                        <div>
                            <p className="text-gray-500">
                                Active Accounts
                            </p>

                            <h2 className="text-3xl font-bold text-purple-600 mt-1">
                                3
                            </h2>
                        </div>
                    </div>

                    {/* Inactive Accounts */}
                    <div className="bg-white border border-gray-200 rounded-3xl px-8 py-7 flex items-center gap-5 hover:shadow-md transition">
                        <div className="w-20 h-20 rounded-2xl bg-orange-100 flex items-center justify-center">
                            <Clock3 size={40} className="text-orange-500" />
                        </div>

                        <div>
                            <p className="text-gray-500">
                                Inactive Accounts
                            </p>

                            <h2 className="text-3xl font-bold text-orange-500 mt-1">
                                0
                            </h2>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Accounts

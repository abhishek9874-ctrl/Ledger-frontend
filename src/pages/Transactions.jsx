import React from 'react'
import SideBar from '../components/SideBar'
import Header from '../components/Header'
import { ArrowDown, ArrowUp, ArrowLeftRight, Wallet, CalendarDays, Search } from "lucide-react";


function Transactions() {
  return (
    <div className='flex flex-col md:flex-row min-h-screen bg-gray-50'>
      <SideBar />
      <div className='flex-1 bg-gray-50'>
        <Header />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 md:m-10 m-5 gap-6">

          {/* Credits */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 flex items-center gap-5 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">

            <div className="w-20 h-20 rounded-3xl bg-green-100 flex items-center justify-center">
              <ArrowDown size={42} className="text-green-600" />
            </div>

            <div>
              <p className="text-gray-500">
                Total Credits
              </p>

              <h2 className="text-4xl font-bold text-green-600 mt-1">
                ₹1,24,500
              </h2>

              <p className="text-gray-500 mt-2">
                This month
              </p>
            </div>

          </div>

          {/* Debits */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 flex items-center gap-5 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">

            <div className="w-20 h-20 rounded-3xl bg-red-100 flex items-center justify-center">
              <ArrowUp size={42} className="text-red-500" />
            </div>

            <div>
              <p className="text-gray-500">
                Total Debits
              </p>

              <h2 className="text-4xl font-bold text-red-500 mt-1">
                ₹86,250
              </h2>

              <p className="text-gray-500 mt-2">
                This month
              </p>
            </div>

          </div>

          {/* Transactions */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 flex items-center gap-5 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">

            <div className="w-20 h-20 rounded-3xl bg-blue-100 flex items-center justify-center">
              <ArrowLeftRight size={42} className="text-blue-600" />
            </div>

            <div>
              <p className="text-gray-500">
                Total Transactions
              </p>

              <h2 className="text-4xl font-bold text-blue-600 mt-1">
                28
              </h2>

              <p className="text-gray-500 mt-2">
                This month
              </p>
            </div>

          </div>

          {/* Balance */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 flex items-center gap-5 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">

            <div className="w-20 h-20 rounded-3xl bg-purple-100 flex items-center justify-center">
              <Wallet size={42} className="text-purple-600" />
            </div>

            <div>
              <p className="text-gray-500">
                Current Balance
              </p>

              <h2 className="text-4xl font-bold text-purple-600 mt-1">
                ₹38,250
              </h2>

              <p className="text-gray-500 mt-2">
                Available Balance
              </p>
            </div>

          </div>

        </div>
        <div className="bg-white border border-gray-200 rounded-3xl p-4 md:p-6 mb-8">

          {/* Filters */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

            {/* Left Side Buttons */}
            <div className="flex flex-wrap gap-3">

              <button className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
                All
              </button>

              <button className="px-6 py-3 rounded-xl bg-green-100 text-green-700 font-medium hover:bg-green-200 transition">
                Credits
              </button>

              <button className="px-6 py-3 rounded-xl bg-red-100 text-red-600 font-medium hover:bg-red-200 transition">
                Debits
              </button>

            </div>

            {/* Right Side */}
            <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">

              {/* Date Filter */}
              <button className="flex items-center justify-between gap-3 border border-gray-200 rounded-xl px-5 py-3 w-full md:w-[250px] hover:border-blue-500 transition">

                <div className="flex items-center gap-3">
                  <CalendarDays size={20} className="text-gray-500" />

                  <span className="text-gray-600">
                    Select Date
                  </span>
                </div>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-500"
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

              </button>

              {/* Search */}
              <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 w-full md:w-[280px]">

                <Search
                  size={20}
                  className="text-gray-500"
                />

                <input
                  type="text"
                  placeholder="Search transactions..."
                  className="w-full outline-none bg-transparent"
                />

              </div>

            </div>

          </div>

          {/* Table */}
          <div className="bg-white border border-gray-200 rounded-3xl mt-6 md:mt-8 overflow-hidden">

            <div className="overflow-x-auto">

              <div className="min-w-[850px]">

                {/* Header */}
                <div className="grid grid-cols-5 bg-gray-100 px-6 py-5 font-semibold text-gray-600 border-b border-gray-200">

                  <p>Date & Time</p>
                  <p>Type</p>
                  <p>Counterparty</p>
                  <p>Amount</p>
                  <p>Status</p>

                </div>

                {/* Row */}
                <div className="grid grid-cols-5 items-center px-6 py-5 border-b border-gray-200 hover:bg-gray-50 transition">

                  {/* Date */}
                  <div>
                    <p className="font-medium">
                      24 Jun 2026
                    </p>

                    <p className="text-sm text-gray-500">
                      09:45 PM
                    </p>
                  </div>

                  {/* Type */}
                  <div className="flex items-center gap-2">

                    <ArrowDown
                      className="text-green-600"
                      size={20}
                    />

                    <span className="text-green-600 font-medium">
                      Credit
                    </span>

                  </div>

                  {/* Counterparty */}
                  <div>

                    <p className="font-medium">
                      Rahul Sharma
                    </p>

                    <p className="text-sm text-gray-500">
                      XXXX2345
                    </p>

                  </div>

                  {/* Amount */}
                  <div className="font-bold text-green-600">
                    +₹5,000
                  </div>

                  {/* Status */}
                  <div>

                    <span className="bg-green-100 text-green-700 px-4 py-2 rounded-xl text-sm font-medium">
                      Completed
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default Transactions

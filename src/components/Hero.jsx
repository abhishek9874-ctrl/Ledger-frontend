import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import { BiChevronDown } from 'react-icons/bi';


function Hero() {
    return (
        <section className='flex flex-col lg:flex-row justify-between items-center min-h-[70vh]'>
            <div className='px-6 md:px-12 lg:px-20 py-10'>
                <div className='max-w-xl text-center lg:text-left'>
                    <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight'>Simple. Secure. <br /> Smart <span className='text-blue-500'>Ledger.</span></h1>
                    <p className='mt-4 text-base md:text-lg text-gray-600 leading-7'>Backend Ledger helps you manage your accounts,<br />
                        track transactions and keep your finances in
                        control <br /> with complete transparency.</p>
                    <div className='mt-7 flex flex-col md:flex-row items-center gap-3 font-medium'>
                        <button className='group border-blue-600 border-2 bg-blue-600 px-8 py-3 text-white rounded-lg flex items-center gap-2 hover:bg-white cursor-pointer hover:text-blue-600 transition-all duration-300'>Get Started <FaArrowRight className="group-hover:translate-x-1 transition-transform" /></button>
                        <button className='text-blue-600 px-7 py-3 cursor-pointer border-blue-300 border-2 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300'>Learn More</button>
                    </div>
                </div>
            </div>
           <div className="relative w-full max-w-[550px] min-h-[440px] mt-10 lg:mr-27 lg:mt-20">
  {/* Background Card */}
  <div className="absolute -top-6 md:-top-8 -left-6 md:-left-8 w-full h-full bg-blue-50 rounded-3xl -z-10"></div>

  {/* Main Card */}
  <div className="relative bg-white p-5 md:p-8 rounded-3xl hover:shadow-2xl transition-all duration-300 shadow-lg">

    {/* Top Section */}
    <div className="flex flex-col sm:flex-row justify-between gap-6">

      <div>
        <h3 className="font-medium text-gray-600">
          Total Balance
        </h3>

        <h1 className="font-bold text-3xl md:text-4xl mt-2">
          ₹24,560.00
        </h1>

        <p className="text-gray-500 mt-2">
          Across all Accounts
        </p>
      </div>

     <div className="flex flex-col items-end sm:items-end">

        <button className="flex items-center gap-2 border rounded-xl px-4 py-2">
          This Month
          <BiChevronDown size={16} />
        </button>

        <svg
          viewBox="0 0 400 150"
          className="w-full max-w-[240px] h-[120px] mt-4"
        >
          <defs>
            <linearGradient
              id="graphFill"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#3B82F6"
                stopOpacity="0.25"
              />

              <stop
                offset="100%"
                stopColor="#3B82F6"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>

          {/* Fill */}
          <path
            d="M20 90 C80 60,120 100,180 60 S280 80,360 30
               L360 150 L20 150 Z"
            fill="url(#graphFill)"
          />

          {/* Line */}
          <path
            d="M20 90 C80 60,120 100,180 60 S280 80,360 30"
            fill="none"
            stroke="#2563EB"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>

      </div>
    </div>

    {/* Transactions Header */}
    <div className="mt-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
      <h2 className="font-bold text-xl">
        Recent Transactions
      </h2>

      <button className="text-blue-600 font-medium">
        View All
      </button>
    </div>

    {/* Transaction List */}
    <div className="mt-6 space-y-4">

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 border-b border-gray-200 pb-4">
        <div>
          <h3 className="font-medium">
            Money Sent
          </h3>

          <p className="text-sm text-gray-500">
            To: Rohan Kumar
          </p>
        </div>

        <div className="text-right">
          <p className="font-semibold">
            - ₹5,000
          </p>

          <p className="text-sm text-gray-500">
            Today, 10:30 AM
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center border-b border-gray-200 pb-4">
        <div>
          <h3 className="font-medium">
            Money Received
          </h3>

          <p className="text-sm text-gray-500">
            From: Priya Sharma
          </p>
        </div>

        <div className="text-right">
          <p className="font-semibold text-green-600">
            + ₹10,000
          </p>

          <p className="text-sm text-gray-500">
            Today, 09:15 AM
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium">
            Payment
          </h3>

          <p className="text-sm text-gray-500">
            To: Amazon
          </p>
        </div>

        <div className="text-right">
          <p className="font-semibold">
            - ₹1,250
          </p>

          <p className="text-sm text-gray-500">
            Yesterday, 08:45 PM
          </p>
        </div>
      </div>

    </div>

  </div>
</div>
        </section>
    )
}

export default Hero

import React, { useState } from 'react'
import { MdAccountBalance } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { NavLink } from "react-router-dom";
import { Landmark } from 'lucide-react';

function Navbar() {
  const [active, setActive] = useState(false);
  return (
    <nav className='flex justify-between items-center border-b px-6 py-4 border-gray-200 '>
      <div className='flex items-center gap-2'>
        <Landmark className="text-blue-600" />
            <h1 className="text-2xl font-bold text-blue-600">
              LEDGERLY
            </h1>
      </div>

      <ul className='hidden md:flex items-center font-medium text-gray-700 gap-8'>
        <Link to={"/dashboard"}><li className='cursor-pointer hover:text-blue-600'>Home</li></Link>
        <Link to={"/accounts"}><li className='cursor-pointer hover:text-blue-600'>Accounts</li></Link>
        <Link to={"/transactions"}> <li className='cursor-pointer hover:text-blue-600'>Transactions</li></Link>
        {user?.systemUser === true && (
          <NavLink
            to="/create-initial-fund"
            className={({ isActive }) =>
              `flex items-center gap-2 cursor-pointer hover:text-blue-600 ${
                isActive ? "text-blue-600" : "text-gray-700"
              }`
            }
          >
            <ArrowLeftRight size={18} />
            Create Initial Funds
          </NavLink>
        )}
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `cursor-pointer hover:text-blue-600 ${isActive ? "text-blue-600" : "text-gray-700"
            }`
          }
        >
          About
        </NavLink>
      </ul>

      <div className='hidden md:flex gap-4'>
        <Link to={"/login"}>
          <button className='px-4 py-2 text-blue-600 font-medium border-2 border-blue-600  rounded-lg  hover:bg-blue-600 transition-all duration-300 hover:text-white cursor-pointer'>Login</button>
        </Link>
        <Link to={"/register"}>
          <button className='px-4 py-2 bg-blue-600 text-white font-medium border-2 hover:bg-white transition-all duration-300 hover:text-blue-600 border-blue-600 rounded-lg cursor-pointer'>Register</button></Link>


      </div>
      <button className="md:hidden text-3xl">
        ☰
      </button>


    </nav>
  )
}

export default Navbar

import React from 'react'
import { MdAccountBalance } from 'react-icons/md'
import { FaWallet } from 'react-icons/fa'
import {Link} from 'react-router-dom'

function Navbar() {
  return (
    <nav className='flex justify-between items-center border-b px-6 py-4 border-gray-200 '>
        <div className='flex items-center gap-2'>
            <MdAccountBalance className='text-4xl text-blue-800' />
            <h1 className='text-xl md:text-2xl  font-bold'>Backend Ledger</h1>
        </div>

        <ul className='hidden md:flex items-center font-medium text-gray-700 gap-8'>
            <li className='cursor-pointer hover:text-blue-600'>Home</li>
            <li className='cursor-pointer hover:text-blue-600'>Accounts</li>
            <li className='cursor-pointer hover:text-blue-600'>Transactions</li>
            <li className='cursor-pointer hover:text-blue-600'>About</li>
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

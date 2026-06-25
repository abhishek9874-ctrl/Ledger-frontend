import React, { useEffect, useState } from 'react'
import SideBar from '../components/SideBar'
import Header from '../components/Header'
import axios from "axios";
import { Link } from 'react-router-dom';
import {
    Landmark,
    Wallet,
    BadgeCheck,
    Clock3
} from "lucide-react";

function Accounts() {
    const [accounts, setAccounts] = useState([]);
    const [totalBalance, setTotalBalance] = useState(0);

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await axios.get(
                    `http://localhost:3000/api/account`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setAccounts(response.data.accounts);

                if (response.data.accounts.length > 0) {

                    const accountId = response.data.accounts[0]._id;

                    const balanceResponse = await axios.get(
                        `http://localhost:3000/api/account/balance/${accountId}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    setTotalBalance(balanceResponse.data.balance);
                }


            } catch (err) {
                console.log(err.response?.data)
            }
        };
        fetchAccounts();
    }, []);






    return (
        <div className='flex flex-col md:flex-row min-h-screen bg-gray-50'>
            <SideBar />

            <div className='flex-1 bg-gray-50'>
                <Header />

                <h1 className='md:text-3xl text-xl font-semibold md:px-10 px-2 md:py-10 md:mt-5 mt-10 mb-10 md:mb-5'>Manage all your accounts in one place.</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                    {/* Total Accounts */}
                    <div className="bg-white border md:h-40 border-gray-200 rounded-3xl px-8 py-7 flex items-center gap-5 hover:shadow-md transition">
                        <div className="w-20 h-20 rounded-2xl bg-blue-100 flex items-center justify-center">
                            <Landmark size={50} className="text-blue-600" />
                        </div>

                        <div>
                            <p className="text-gray-500 text-2xl">
                                Total Accounts
                            </p>

                            <h2 className="text-3xl font-bold mt-1">
                                {accounts.length}
                            </h2>
                        </div>
                    </div>

                    {/* Total Balance */}
                    <div className="bg-white border border-gray-200 rounded-3xl px-8 py-8 min-h-[140px] flex items-center gap-6 hover:shadow-md transition">
                        <div className="w-20 h-20 rounded-2xl bg-green-100 flex items-center justify-center">
                            <Wallet size={50} className="text-green-600" />
                        </div>

                        <div>
                            <p className="text-gray-500 text-2xl">
                                Total Balance
                            </p>


                            <h2 className="text-2xl font-bold text-black mt-1">
                                ₹{totalBalance.toLocaleString("en-IN")}
                            </h2>
                        </div>
                    </div>

                    {/* Active Accounts */}
                    <div className="bg-white border border-gray-200 rounded-3xl px-8 py-7 flex items-center gap-5 hover:shadow-md transition">
                        <div className="w-20 h-20 rounded-2xl bg-purple-100 flex items-center justify-center">
                            <BadgeCheck size={50} className="text-purple-600" />
                        </div>

                        <div>
                            <p className="text-gray-500 text-2xl">
                                Active Accounts
                            </p>

                            <h2 className="text-3xl font-bold text-purple-600 mt-1">
                                {accounts.filter(
                                    account => account.status === 'ACTIVE'
                                ).length}
                            </h2>
                        </div>
                    </div>

                    {/* Inactive Accounts */}


                </div>
                {/* My Accounts */}
                <div className="mt-12">

                    <h2 className="text-3xl font-bold mb-6 md:px-10 px-4">
                        My Accounts
                    </h2>

                    {/* Account Card */}
                    {accounts.map((account)=>(
                    <div key={account._id} className="bg-white border border-gray-200 rounded-3xl px-6 py-8 hover:shadow-lg transition-all duration-300">

                        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between md:gap-6 gap-10">

                            {/* Left Section */}
                            <div className="flex items-center md:gap-6 gap-10">

                                <div className="w-20 h-20 rounded-3xl bg-blue-100 flex items-center justify-center">
                                    <Landmark size={40} className="text-blue-600" />
                                </div>

                                <div>
                                    <h3 className="text-2xl font-semibold">
                                        Account
                                    </h3>

                                    <p className="text-gray-500 mt-2">
                                        Account ID
                                    </p>

                                    <p className="text-xl">
                                        {account._id}
                                    </p>
                                </div>

                            </div>

                            {/* Middle Section */}
                            <div className="grid grid-cols-2 xl:flex xl:flex-wrap gap-6 xl:gap-12">

                                <div>
                                    <p className="text-gray-500">
                                        Currency
                                    </p>

                                    <h4 className="text-xl font-medium mt-1">
                                        {account.currency}
                                    </h4>
                                </div>

                                <div>
                                    <p className="text-gray-500">
                                        Created On
                                    </p>

                                    <h4 className="text-xl font-medium mt-1">
                                        {new Date(account.createdAt).toLocaleDateString("en-IN")}
                                    </h4>
                                </div>

                                <div>
                                    <p className="text-gray-500 ">
                                        Balance
                                    </p>

                                    <h4 className="text-3xl font-bold mt-1">
                                        ₹{totalBalance.toLocaleString("en-IN")}
                                    </h4>
                                </div>

                            </div>

                            {/* Right Section */}
                            <div className="flex flex-col items-start xl:items-end gap-4 ">

                                <span className="w-fit bg-green-100 text-green-700 px-4 py-2 rounded-xl font-medium">
                                    {account.status}
                                </span>

                               <Link to={`/viewdetails/${account._id}`}>
                                    <button className="w-full xl:w-auto border border-blue-600 text-blue-600 px-6 py-3 rounded-xl hover:bg-blue-600 hover:text-white transition">
                                    View Details →
                                </button>
                               </Link>

                            </div>

                        </div>

                    </div>))}

                </div>
            </div>
        </div>
    )
}

export default Accounts

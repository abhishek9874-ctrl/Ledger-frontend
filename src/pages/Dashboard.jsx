import React, { useEffect, useState } from 'react'
import axios from 'axios';
import SideBar from '../components/SideBar'
import Header from '../components/Header'
const user = JSON.parse(localStorage.getItem("user"));
import { Eye, EyeOff } from "lucide-react";

function Dashboard() {
    const [showBalance, setShowBalance] = useState(false);
    const [accounts, setAccounts] = useState([]);
    const [totalBalance, setTotalBalance] = useState(0);

    const [transactions, setTransactions] = useState([]);
    
    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await axios.get(
                    "http://localhost:3000/api/account",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setAccounts(response.data.accounts);



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

                const transactionResponse = await axios.get(
                    "http://localhost:3000/api/transactions/recent",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setTransactions(transactionResponse.data.transactions);
            } catch (error) {
                console.log(error.response?.data);
            }
        };

        fetchAccounts();
    }, []);

    return (
        <div className='flex flex-col md:flex-row min-h-screen bg-gray-50'>
            <SideBar />

            <div className='flex-1 bg-gray-50'>
                <Header />

                <div className='p-4 md:p-8 w-full'>
                    <h1 className='font-bold text-2xl md:text-4xl'>Welcome back, {user?.name}!👋</h1>
                    <p className='py-2 md:py-4 text-sm md:text-base text-gray-600'>Here's a quick overview of your finances.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">

                        {/* Total Balance */}
                        <div className="bg-white border border-gray-200 rounded-3xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                            <div className="flex items-center gap-4">

                                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-2xl">
                                    💳
                                </div>

                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm text-gray-500">
                                            Total Balance
                                        </p>

                                        <button
                                            onClick={() => setShowBalance(!showBalance)}
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            {showBalance ? (
                                                <EyeOff size={16} />
                                            ) : (
                                                <Eye size={16} />
                                            )}
                                        </button>
                                    </div>

                                    <h2 className="text-3xl font-bold text-slate-900 mt-1">
                                        {showBalance
                                            ? `₹${totalBalance.toLocaleString("en-IN")}`
                                            : "XXXXXX.XX"}
                                    </h2>

                                    <p className="text-sm text-gray-400 mt-1">
                                        Across all accounts
                                    </p>
                                </div>

                            </div>
                        </div>

                        {/* Monthly Expense */}
                        <div className="bg-white border border-gray-200 rounded-3xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                            <div className="flex items-center gap-4">

                                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-2xl">
                                    📈
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        This Month Expense
                                    </p>

                                    <h2 className="text-3xl font-bold text-slate-900 mt-1">
                                        ₹12,500
                                    </h2>

                                    <p className="text-sm text-gray-400 mt-1">
                                        Total expense this month
                                    </p>
                                </div>

                            </div>
                        </div>

                        {/* Active Accounts */}
                        <div className="bg-white border border-gray-200 rounded-3xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                            <div className="flex items-center gap-4">

                                <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center text-2xl">
                                    🏦
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Active Accounts
                                    </p>

                                    <h2 className="text-3xl font-bold text-slate-900 mt-1">
                                        {accounts.length}
                                    </h2>

                                    <p className="text-sm text-gray-400 mt-1">
                                        Total active accounts
                                    </p>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">

                    {/* My Accounts */}
                    <div className="bg-white border border-gray-200 md:m-6 hover:shadow-lg transition-all duration-300 rounded-3xl p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">My Accounts</h2>

                            <button className="text-blue-600 font-medium transition-all duration-300 hover:text-blue-800">
                                View All
                            </button>
                        </div>

                        <div className="space-y-4">

                            {accounts.map((account) => (
                                <div
                                    key={account._id}
                                    className="border border-gray-200 rounded-2xl p-5 flex items-center justify-between hover:shadow-md transition-all duration-300 cursor-pointer"
                                >
                                    <div className="flex items-center gap-4">

                                        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white">
                                            🏦
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-lg">
                                                Account
                                            </h3>

                                            <p className="text-gray-500 text-sm">
                                                ACC-{account._id.slice(-4)}
                                            </p>
                                        </div>

                                    </div>

                                    <div className="text-right">
                                        <span
                                            className={`px-3 py-1 rounded-lg text-sm ${account.status === "ACTIVE"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {account.status}
                                        </span>

                                        <h3 className="font-bold text-lg mt-2 text-gray-500">
                                            Click to View
                                        </h3>
                                    </div>
                                </div>
                            ))}

                            <button
                                className="w-full border border-gray-200 rounded-2xl py-4 text-blue-600 font-semibold hover:bg-blue-50 transition"
                            >
                                + Add Account
                            </button>

                        </div>
                    </div>

                    {/* Recent Transactions */}
                    <div className="bg-white border border-gray-200 md:m-6 hover:shadow-lg transition-all duration-300 rounded-3xl p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">
                                Recent Transactions
                            </h2>

                            <button className="text-blue-600 cursor-pointer font-medium hover:text-blue-700">
                                View All
                            </button>
                        </div>

                        <div className="space-y-5">
                            {transactions.map((transaction)=>(
                                 <div key={transaction._id} className="flex justify-between items-center border-b border-gray-200 pb-4">
                                <div>
                                    <h3 className="font-semibold">
                                        Transaction
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        {new Date(transaction.createdAt).toLocaleDateString("en-IN")}
                                    </p>
                                </div>

                                <span className="text-green-600 font-bold">
                                     ₹{transaction.amount.toLocaleString("en-IN")}
                                </span>
                            </div>
                            ))}

                            {/* Transaction */}
                           

                            {/* Transaction */}
                            

                            {/* Transaction */}
                            

                            <div className="text-center pt-2">
                                <button className="text-blue-600 font-semibold cursor-pointer hover:text-blue-700">
                                    View More →
                                </button>
                            </div>

                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Dashboard

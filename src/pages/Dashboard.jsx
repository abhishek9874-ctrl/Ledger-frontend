import React, { useEffect, useState } from 'react'
import api from "../api/axios";
import SideBar from '../components/SideBar'
import Header from '../components/Header'
const user = JSON.parse(localStorage.getItem("user"));
import { Eye, EyeOff, ReceiptText } from "lucide-react";
import { Link } from 'react-router-dom';

function Dashboard() {
    const [showBalance, setShowBalance] = useState(false);
    const [accounts, setAccounts] = useState([]);
    const [totalBalance, setTotalBalance] = useState(0);
    const [myAccountId, setMyAccountId] = useState(null)
    const [monthlyExpense, setMonthlyExpense] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [user, setUser] = useState(null);




    useEffect(() => {
        const fetchProfile = async () => {
            try {

                const response = await api.get(
                    "/account/profile"

                );

                setUser(response.data.account.user);

            } catch (err) {
                console.log(err.response?.data);
            }
        };

        fetchProfile();
    }, []);

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await api.get("/account");

                const userAccounts = response.data.accounts;

                setAccounts(userAccounts);

                if (userAccounts.length === 0) {
                    setTotalBalance(0);
                    setMyAccountId(null);
                    return;
                }

                // Primary account
                const primaryAccountId = userAccounts[0]._id;
                setMyAccountId(primaryAccountId);

                // Get balance of every account
                const balanceResponses = await Promise.all(
                    userAccounts.map((account) =>
                        api.get(`/account/balance/${account._id}`)
                    )
                );

                // Calculate total balance of all accounts
                const total = balanceResponses.reduce(
                    (sum, response) => sum + response.data.balance,
                    0
                );

                setTotalBalance(total);

                // Recent transactions
                const transactionResponse = await api.get(
                    "/transactions/recent"
                );

                setTransactions(transactionResponse.data.transactions);

                // Get ledger of every account
                const ledgerResponses = await Promise.all(
                    userAccounts.map((account) =>
                        api.get(`/ledger/${account._id}`)
                    )
                );

                const currentMonth = new Date().getMonth();
                const currentYear = new Date().getFullYear();

                let totalMonthlyExpense = 0;

                ledgerResponses.forEach((ledgerResponse) => {

                    const monthlyExpenses =
                        ledgerResponse.data.entries.filter((entry) => {

                            const transactionDate =
                                new Date(entry.createdAt);

                            return (
                                entry.type === "DEBIT" &&
                                transactionDate.getMonth() === currentMonth &&
                                transactionDate.getFullYear() === currentYear
                            );
                        });

                    const accountExpense = monthlyExpenses.reduce(
                        (sum, entry) => sum + entry.amount,
                        0
                    );

                    totalMonthlyExpense += accountExpense;
                });

                setMonthlyExpense(totalMonthlyExpense);

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
                                        ₹{monthlyExpense.toLocaleString("en-IN")}
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
                                        Account Number
                                    </p>

                                    <h2 className="text-3xl font-bold text-slate-900 mt-1">
                                        *****{myAccountId?.slice(-6).toUpperCase()}
                                    </h2>

                                    <p className="text-sm text-gray-400 mt-1">
                                        Primary Account
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



                                    </div>
                                </div>
                            ))}

                            <Link to={"/accounts"}>
                                <button
                                    className="w-full border border-gray-200 rounded-2xl py-4 text-blue-600 font-semibold hover:bg-blue-50 transition"
                                >
                                    Manage Account
                                </button>
                            </Link>

                        </div>
                    </div>

                    {/* Recent Transactions */}
                    <div className="bg-white border border-gray-200 md:m-6 hover:shadow-lg transition-all duration-300 rounded-3xl p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">
                                Recent Transactions
                            </h2>


                        </div>

                        <div className="space-y-5">
                            {transactions.length === 0
                                ? (<div className="flex flex-col items-center justify-center py-16 text-center">
                                    <ReceiptText size={52} className="text-gray-300 mb-4" />

                                    <h3 className="text-xl font-semibold text-gray-700">
                                        No recent transactions
                                    </h3>

                                    <p className="text-gray-500 mt-2">
                                        Your recent transfers will appear here.
                                    </p>
                                </div>) : (

                                    transactions.map((transaction) => {
                                        const isDebit = accounts.some(
                                            (account) => account._id === transaction.fromAccount._id
                                        );


                                        return (
                                            <div key={transaction._id} className="flex justify-between items-center border-b border-gray-200 pb-4">
                                                <div>
                                                    <h3 className="font-semibold">
                                                        {isDebit
                                                            ? `Sent to ${transaction.toAccount.user.name}`
                                                            : `Received from ${transaction.fromAccount.user.name}`}
                                                    </h3>

                                                    <p className="text-sm text-gray-500">
                                                        {new Date(transaction.createdAt).toLocaleDateString("en-IN")}
                                                    </p>
                                                </div>

                                                <span className={`${isDebit ? "text-red-600" : "text-green-600"} font-bold`}>
                                                    {isDebit ? "-" : "+"}₹{transaction.amount.toLocaleString("en-IN")}
                                                </span>
                                            </div>
                                        )
                                    })

                                )}


                            <div className="text-center pt-2">
                                <Link to={"/transactions"}>
                                    <button className="text-blue-600 font-semibold cursor-pointer hover:text-blue-700">
                                        View More →
                                    </button>
                                </Link>
                            </div>

                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Dashboard

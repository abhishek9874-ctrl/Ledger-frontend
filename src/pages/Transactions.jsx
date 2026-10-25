import React, { useEffect, useState } from 'react'
import SideBar from '../components/SideBar'
import Header from '../components/Header'
import { ArrowDown, ArrowUp, ArrowLeftRight, Wallet, CalendarDays, Search, ReceiptText } from "lucide-react";
import api from '../api/axios';
import TransactionDetailsModal from '../components/TransactionDetailsModal';
import { AnimatePresence } from "framer-motion";



const getCurrentMonthEntries = (entries) => {
    const now = new Date();

    const monthStart = new Date(
        now.getFullYear(),
        now.getMonth(),
        1
    );

    const nextMonthStart = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        1
    );

    return entries.filter((entry) => {
        const entryDate = new Date(entry.createdAt);
        return entryDate >= monthStart && entryDate < nextMonthStart;
    });
};


function Transactions() {
    const [accounts, setAccounts] = useState([]);
    const [balance, setBalance] = useState(0);
    const [totalCredits, setTotalCredits] = useState(0);
    const [totalDebits, setTotalDebits] = useState(0);
    const [totalTransactions, setTotalTransactions] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [myAccountId, setMyAccountId] = useState("");
    const [filter, setFilter] = useState("ALL");
    const [search, setSearch] = useState("");
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedAccount, setSelectedAccount] = useState("all");
    const [showAccountDropdown, setShowAccountDropdown] = useState(false);

    useEffect(() => {

        const fetchData = async () => {

            try {

                // Fetch user's accounts
                const accountResponse = await api.get("/account");

                setAccounts(accountResponse.data.accounts);

                // Set first account as user's default account
                if (accountResponse.data.accounts.length > 0) {
                    setMyAccountId(accountResponse.data.accounts[0]._id);
                }

                // Fetch transactions
                const transactionResponse = await api.get("/transactions");

                setTransactions(
                    transactionResponse.data.transactions
                );

            } catch (err) {

                console.log(err.response?.data);

            }

        };

        fetchData();

    }, []);

    useEffect(() => {

        const calculateAccountStats = async () => {

            try {

                // ALL ACCOUNTS
                if (selectedAccount === "all") {

                    let totalBalance = 0;
                    let totalCredit = 0;
                    let totalDebit = 0;
                    let totalTransaction = 0;

                    for (const account of accounts) {

                        const balanceResponse = await api.get(
                            `/account/balance/${account._id}`
                        );

                        totalBalance += balanceResponse.data.balance;

                        const ledgerResponse = await api.get(
                            `/ledger/${account._id}`
                        );

                        const entries = ledgerResponse.data.entries;
                        const monthlyEntries = getCurrentMonthEntries(entries);

                        
                        totalCredit += monthlyEntries
                            .filter(entry => entry.type === "CREDIT")
                            .reduce((sum, entry) => sum + entry.amount, 0);

                        totalDebit += monthlyEntries
                            .filter(entry => entry.type === "DEBIT")
                            .reduce((sum, entry) => sum + entry.amount, 0);

                        totalTransaction += monthlyEntries.length;
                    }

                    setBalance(totalBalance);
                    setTotalCredits(totalCredit);
                    setTotalDebits(totalDebit);
                    setTotalTransactions(totalTransaction);

                    return;
                }

                // SINGLE ACCOUNT
                const balanceResponse = await api.get(
                    `/account/balance/${selectedAccount}`
                );

                setBalance(balanceResponse.data.balance);

                const ledgerResponse = await api.get(
                    `/ledger/${selectedAccount}`
                );

                const entries = ledgerResponse.data.entries;
                const monthlyEntries = getCurrentMonthEntries(entries);
                

                const credits = monthlyEntries
                    .filter(entry => entry.type === "CREDIT")
                    .reduce((sum, entry) => sum + entry.amount, 0);

                const debits = monthlyEntries
                    .filter(entry => entry.type === "DEBIT")
                    .reduce((sum, entry) => sum + entry.amount, 0);

                setTotalCredits(credits);
                setTotalDebits(debits);
                setTotalTransactions(entries.length);

            } catch (err) {

                console.log(err.response?.data);

            }
        };

        if (accounts.length > 0) {
            calculateAccountStats();
        }

    }, [selectedAccount, accounts]);
    const filteredTransactions = transactions.filter((transaction) => {

        const belongsToSelectedAccount =
            selectedAccount === "all" ||
            transaction.fromAccount._id === selectedAccount ||
            transaction.toAccount._id === selectedAccount;

        if (!belongsToSelectedAccount) {
            return false;
        }

        const isCredit =
            selectedAccount !== "all"
                ? transaction.toAccount._id === selectedAccount
                : transaction.toAccount._id === myAccountId;

        const counterparty = isCredit
            ? transaction.fromAccount.user.name
            : transaction.toAccount.user.name;

        const matchesSearch = counterparty
            .toLowerCase()
            .includes(search.toLowerCase());

        const transactionDate = new Date(transaction.createdAt)
            .toISOString()
            .split("T")[0];

        const matchesDate =
            !selectedDate || transactionDate === selectedDate;

        if (filter === "CREDIT" && !isCredit) return false;
        if (filter === "DEBIT" && isCredit) return false;

        return matchesSearch && matchesDate;
    });

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
                                ₹{totalCredits.toLocaleString("en-IN")}
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
                                ₹{totalDebits.toLocaleString("en-IN")}
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
                                {totalTransactions}
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
                                ₹{balance.toLocaleString("en-IN")}
                            </h2>

                            <p className="text-gray-500 mt-2">
                                Available Balance
                            </p>
                        </div>

                    </div>

                </div>
                <div className="bg-white border border-gray-200 rounded-3xl p-4 md:p-6 mb-8">
                    {/* Account Selector */}
                    <div className="mb-6 w-full relative">
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                            Account
                        </label>

                        <button
                            type="button"
                            onClick={() => setShowAccountDropdown(!showAccountDropdown)}
                            className="w-full sm:w-[240px] max-w-full border border-gray-200 rounded-xl px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between gap-3"
                        >
                            <span className="truncate">
                                {selectedAccount === "all"
                                    ? "All Accounts"
                                    : `Account — ****${selectedAccount.slice(-6).toUpperCase()}`}
                            </span>

                            <span className="text-gray-500 shrink-0">
                                ▼
                            </span>
                        </button>

                        {showAccountDropdown && (
                            <div className="absolute left-0 top-full mt-2 w-full sm:w-[240px] max-w-full bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">

                                {/* All Accounts */}
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSelectedAccount("all");
                                        setShowAccountDropdown(false);
                                    }}
                                    className="w-full px-4 py-3 text-left hover:bg-gray-100 transition truncate"
                                >
                                    All Accounts
                                </button>

                                {/* Accounts */}
                                {accounts.map((account) => (
                                    <button
                                        type="button"
                                        key={account._id}
                                        onClick={() => {
                                            setSelectedAccount(account._id);
                                            setShowAccountDropdown(false);
                                        }}
                                        className="w-full px-4 py-3 text-left hover:bg-gray-100 transition truncate"
                                    >
                                        Account — ****{account._id.slice(-6).toUpperCase()}
                                    </button>
                                ))}

                            </div>
                        )}
                    </div>
                    {/* Filters */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                        {/* Left Side Buttons */}
                        <div className="flex flex-wrap gap-3">

                            <button
                                onClick={() => setFilter("ALL")}
                                className={`px-6 py-3 rounded-xl font-medium transition ${filter === "ALL"
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                            >
                                All
                            </button>

                            <button
                                onClick={() => setFilter("CREDIT")}
                                className={`px-6 py-3 rounded-xl font-medium transition ${filter === "CREDIT"
                                    ? "bg-green-600 text-white"
                                    : "bg-green-100 text-green-700 hover:bg-green-200"
                                    }`}
                            >
                                Credits
                            </button>

                            <button
                                onClick={() => setFilter("DEBIT")}
                                className={`px-6 py-3 rounded-xl font-medium transition ${filter === "DEBIT"
                                    ? "bg-red-600 text-white"
                                    : "bg-red-100 text-red-700 hover:bg-red-200"
                                    }`}
                            >
                                Debits
                            </button>
                        </div>

                        {/* Right Side */}
                        <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">

                            {/* Date Filter */}
                            <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-5 py-3 w-full md:w-[250px] hover:border-blue-500 transition">
                                <CalendarDays size={20} className="text-gray-500" />

                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    className="w-full outline-none bg-transparent text-gray-600"
                                />
                            </div>

                            {/* Search */}
                            <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 w-full md:w-[280px]">

                                <Search
                                    size={20}
                                    className="text-gray-500"
                                />

                                <input
                                    type="text"
                                    placeholder="Search transactions..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
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
                                {
                                    transactions.length === 0
                                        ? (<div className="flex flex-col items-center justify-center py-16 text-center">
                                            <ReceiptText size={52} className="text-gray-300 mb-4" />

                                            <h3 className="text-xl font-semibold text-gray-700">
                                                No recent transactions
                                            </h3>

                                            <p className="text-gray-500 mt-2">
                                                Your recent transfers will appear here.
                                            </p>
                                        </div>) :
                                        (filteredTransactions.map((transaction) => {
                                            const isCredit =
                                                selectedAccount !== "all"
                                                    ? transaction.toAccount._id === selectedAccount
                                                    : accounts.some(
                                                        account => account._id === transaction.toAccount._id
                                                    );
                                            return (
                                                <div>
                                                    <div
                                                        onClick={() => setSelectedTransaction(transaction)}
                                                        key={transaction._id} className="grid grid-cols-5 items-center px-6 py-5 border-b border-gray-200 hover:bg-gray-50 transition">

                                                        {/* Date */}
                                                        <div>
                                                            <p className="font-medium">
                                                                {new Date(transaction.createdAt).toLocaleDateString("en-IN")}
                                                            </p>

                                                            <p className="text-sm text-gray-500">
                                                                {new Date(transaction.createdAt).toLocaleTimeString("en-IN")}
                                                            </p>
                                                        </div>

                                                        {/* Type */}
                                                        <div className="flex items-center gap-2">

                                                            {isCredit ? (
                                                                <ArrowDown className="text-green-600" size={20} />
                                                            ) : (
                                                                <ArrowUp className="text-red-600" size={20} />
                                                            )}

                                                            <span className={
                                                                isCredit ?
                                                                    "text-green-600 font-medium"
                                                                    : "text-red-600 font-medium"
                                                            }>
                                                                {isCredit ?
                                                                    "CREDIT" : "DEBIT"}
                                                            </span>

                                                        </div>

                                                        {/* Counterparty */}
                                                        <div>

                                                            <p className="font-medium">
                                                                {isCredit
                                                                    ? transaction.fromAccount.user.name
                                                                    : transaction.toAccount.user.name}
                                                            </p>

                                                            <p className="text-sm text-gray-500">
                                                                ****
                                                                {(isCredit
                                                                    ? transaction.fromAccount._id
                                                                    : transaction.toAccount._id
                                                                ).slice(-6)}
                                                            </p>

                                                        </div>

                                                        {/* Amount */}
                                                        <div
                                                            className={`font-bold ${isCredit ? "text-green-600" : "text-red-600"
                                                                }`}
                                                        >
                                                            {isCredit ? "+" : "-"}₹{transaction.amount.toLocaleString("en-IN")}
                                                        </div>

                                                        {/* Status */}
                                                        <div>

                                                            <span
                                                                className={`px-4 py-2 rounded-xl text-sm font-medium ${transaction.status === "COMPLETED"
                                                                    ? "bg-green-100 text-green-700"
                                                                    : transaction.status === "PENDING"
                                                                        ? "bg-yellow-100 text-yellow-700"
                                                                        : transaction.status === "FAILED"
                                                                            ? "bg-red-100 text-red-700"
                                                                            : "bg-gray-100 text-gray-700"
                                                                    }`}
                                                            >
                                                                {transaction.status}
                                                            </span>

                                                        </div>

                                                    </div>
                                                </div>
                                            )
                                        }))
                                }

                            </div>

                        </div>

                    </div>

                </div>

            </div>
            <AnimatePresence>
                {
                    selectedTransaction && (
                        <TransactionDetailsModal
                            transaction={selectedTransaction}
                            myAccountId={myAccountId}
                            onClose={() => setSelectedTransaction(null)}
                        />
                    )
                }
            </AnimatePresence>
        </div>
    )
}

export default Transactions
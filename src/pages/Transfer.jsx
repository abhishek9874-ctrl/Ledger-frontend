import React, { useEffect, useRef, useState } from 'react'
import SideBar from '../components/SideBar'
import Header from '../components/Header'
import {
    ArrowLeftRight,
    Wallet,
    User,
    FileText,
    Send,
    ChevronDown,
} from "lucide-react";
import axios from 'axios';
import { v4 as uuidv4 } from "uuid";

function Transfer() {
    const [amount, setAmount] = useState("");
    const [accounts, setAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const [myAccount, setMyAccount] = useState(null);
    const [balance, setBalance] = useState(0);
    const [amountError, setAmountError] = useState("");
    const [recipientError, setRecipientError] = useState("");
    const [showSuccessCard, setShowSuccessCard] = useState(false);
    const [note, setNote] = useState("");
    const [successAmount, setSuccessAmount] = useState(0);
    const [successRecipient, setSuccessRecipient] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchAllAccounts = async () => {
        try {
            const token = localStorage.getItem("token")

            const response = await axios.get(
                "http://localhost:3000/api/account/all",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            setAccounts(response.data.accounts);
            if (response.data.accounts.length > 0) {
                setSelectedAccount(response.data.accounts[0]);
            }
        } catch (err) {
            console.log(err);
        }
    }


    const fetchMyAccount = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.get(
                `http://localhost:3000/api/account`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            setMyAccount(response.data.accounts[0])
            fetchBalance(response.data.accounts[0]._id);
        } catch (err) {
            console.log(err)
        }
    }




    const fetchBalance = async (accountId) => {
        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                `http://localhost:3000/api/account/balance/${accountId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setBalance(response.data.balance);

        } catch (err) {
            console.log(err);
        }
    };




    useEffect(() => {
        fetchMyAccount();
        fetchAllAccounts();
    }, []);

    console.log(balance)
    useEffect(() => {

        function handleClickOutside(event) {

            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setShowDropdown(false);
            }

        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, []);



    const handleTransfer = async () => {

        setAmountError("");
        setRecipientError("");

        let hasError = false;

        if (!selectedAccount) {
            setRecipientError("Please select a recipient account");
            hasError = true;
        }

        if (!amount || Number(amount) <= 0) {
            setAmountError("Please enter a valid amount");
            hasError = true;
        }

        if (hasError) return;

        console.log("Validation Passed");


        setLoading(true);


        try {
            const idempotencyKey = uuidv4();

            console.log(idempotencyKey);

            const transferData = {
                fromAccount: myAccount._id,
                toAccount: selectedAccount._id,
                amount: Number(amount),
                idempotencyKey
            };

            console.log(transferData);

            const token = localStorage.getItem("token");

            const response = await axios.post(
                "http://localhost:3000/api/transactions",
                transferData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log(response.data);
            await fetchMyAccount();
            setSuccessAmount(Number(amount));
            setSuccessRecipient(selectedAccount.user.name);
            setShowSuccessCard(true);

            setAmount("");
            setNote("");
            setAmountError("");
            setRecipientError("");


        } catch (err) {
            console.log(err)
        }
        finally {
            setLoading(false)
        }
    }


    return (
        <div className='flex flex-col md:flex-row min-h-screen bg-gray-50'>
            <SideBar />
            <div className='flex-1 bg-gray-50'>
                <Header />
                <div className="max-w-4xl mx-auto mt-10">
                    <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">

                        {/* Header */}
                        <div className="flex items-start gap-5 mb-10">

                            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">

                                <ArrowLeftRight
                                    size={34}
                                    className="text-blue-600"
                                />

                            </div>

                            <div>

                                <h2 className="text-3xl font-bold text-gray-900">
                                    Transfer Money
                                </h2>

                                <p className="text-gray-500 mt-1">
                                    Fill in the details below to transfer money
                                </p>

                            </div>

                        </div>
                        {/* Transfer Form */}
                        <div className="space-y-8">

                            {/* ================= From Account ================= */}
                            <div>

                                <label className="block text-lg font-semibold text-gray-800 mb-3">
                                    From Account
                                </label>

                                <button className="w-full border border-gray-200 rounded-2xl px-5 py-4 flex items-center justify-between hover:border-blue-500 transition">

                                    <div className="flex items-center gap-4">

                                        <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                                            <Wallet className="text-blue-600" size={24} />
                                        </div>

                                        <div className="text-left">

                                            <h3 className="font-semibold text-lg">
                                                Savings Account
                                            </h3>

                                            <p className="text-gray-500">
                                                *****{myAccount?._id.slice(-6)}
                                                <span className="mx-2">•</span>
                                                ₹{balance.toLocaleString("en-IN")}
                                            </p>

                                        </div>

                                    </div>

                                    <ChevronDown className="text-gray-500" size={22} />

                                </button>

                                <p className="text-blue-600 mt-3 font-medium">
                                    This is your default account
                                </p>

                            </div>

                            {/* ================= To Account ================= */}
                            <div>

                                <label className="block text-lg font-semibold text-gray-800 mb-3">
                                    To Account
                                </label>

                                <div ref={dropdownRef} className="relative">

                                    <button
                                        onClick={() => setShowDropdown(!showDropdown)}
                                        className="w-full border border-gray-200 rounded-2xl px-5 py-4 flex items-center justify-between hover:border-blue-500 transition"
                                    >

                                        <div className="flex items-center gap-4">

                                            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                                                <User className="text-gray-600" size={24} />
                                            </div>

                                            <div className="text-left">
                                                <h3 className="font-semibold text-lg">
                                                    {selectedAccount?.user?.name}
                                                </h3>

                                                <p className="text-gray-500">
                                                    *****{selectedAccount?._id.slice(-6)}
                                                </p>
                                            </div>

                                        </div>

                                        <ChevronDown className="text-gray-500" size={22} />

                                    </button>

                                    {/* Dropdown OUTSIDE the button */}
                                    {showDropdown && (
                                        <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-2xl shadow-lg z-50 overflow-hidden">

                                            {accounts.map((account) => (
                                                <button
                                                    key={account._id}
                                                    onClick={() => {
                                                        setSelectedAccount(account);
                                                        setShowDropdown(false);
                                                    }}
                                                    className="w-full px-5 py-4 text-left hover:bg-gray-100 transition"
                                                >
                                                    <h3 className="font-semibold">
                                                        {account.user.name}
                                                    </h3>

                                                    <p className="text-sm text-gray-500">
                                                        *****{account._id.slice(-6)}
                                                    </p>
                                                </button>
                                            ))}

                                        </div>
                                    )}
                                    {recipientError && (
                                        <p className="text-red-500 text-sm mt-2">
                                            {recipientError}
                                        </p>
                                    )}

                                </div>

                            </div>

                            {/* ================= Amount ================= */}
                            <div>

                                <label className="block text-lg font-semibold text-gray-800 mb-3">
                                    Amount
                                </label>

                                <div className="flex border border-gray-200 rounded-2xl overflow-hidden">

                                    <div className="w-16 bg-gray-50 flex items-center justify-center text-3xl text-gray-700">
                                        ₹
                                    </div>

                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        value={amount}
                                        onChange={(e) => {
                                            const value = e.target.value;

                                            if (value === "") {
                                                setAmount("");
                                                setAmountError("");
                                                return;
                                            }

                                            if (Number(value) < 0) {
                                                setAmountError("Amount cannot be negative");
                                                setAmount("");
                                                return;
                                            }

                                            setAmountError("");
                                            setAmount(value);
                                        }}
                                        placeholder="Enter amount"
                                        className="flex-1 px-5 py-5 outline-none text-lg"
                                    />

                                    <div className="px-5 flex items-center text-gray-500 text-lg">
                                        0.00
                                    </div>

                                </div>
                                {amountError && (
                                    <p className="text-red-500 text-sm mt-2">
                                        {amountError}
                                    </p>
                                )}

                                <p className="text-gray-500 mt-3">
                                    Enter amount to transfer
                                </p>

                            </div>

                            {/* ================= Transfer Note ================= */}
                            <div>

                                <label className="block text-lg font-semibold text-gray-800 mb-3">
                                    Transfer Note (Optional)
                                </label>

                                <div className="flex border border-gray-200 rounded-2xl overflow-hidden">

                                    <div className="w-16 bg-gray-50 flex items-center justify-center">
                                        <FileText className="text-gray-500" size={22} />
                                    </div>

                                    <input
                                        type="text"
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}
                                        placeholder="Add a note (optional)"
                                        className="flex-1 px-5 py-5 outline-none text-lg"
                                    />

                                    <div className="px-5 flex items-center text-gray-500">
                                        0/100
                                    </div>

                                </div>

                            </div>

                            {/* ================= Button ================= */}
                            <button
                                onClick={handleTransfer}
                                disabled={loading}
                                className={`w-full rounded-2xl py-5 text-xl font-semibold flex items-center justify-center gap-3 transition-all duration-200
                                    ${
                                        loading
                                        ? "bg-blue-400 cursor-not-allowed opacity-80"
                                        : "bg-blue-600 hover:bg-blue-700 hover:scale-[1.01] active:scale-[0.99] text-white"
                                    }`}
                            >
                                {!loading && <Send size={24} />}

                                {loading ? "Transferring..." : "Transfer Money"}
                            </button>
                        </div>

                    </div>
                </div>

                {/* Success Card */}
                {showSuccessCard && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                        <div className="bg-white w-[420px] rounded-3xl shadow-2xl p-8">

                            <div className="flex justify-center mb-5">
                                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                                    <span className="text-4xl">✅</span>
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold text-center">
                                Transaction Completed
                            </h2>

                            <p className="text-center text-gray-500 mt-2">
                                Your money has been transferred successfully.
                            </p>

                            <div className="mt-8 border rounded-2xl p-5 space-y-4">

                                <div className="flex justify-between">
                                    <span className="text-gray-500">To Account</span>

                                    <span className="font-semibold">
                                        {successRecipient}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-500">Amount</span>

                                    <span className="font-bold text-green-600">
                                        ₹{successAmount.toLocaleString("en-IN")}
                                    </span>
                                </div>

                            </div>

                            <button
                                onClick={() => setShowSuccessCard(false)}
                                className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl font-semibold"
                            >
                                Done
                            </button>

                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}

export default Transfer

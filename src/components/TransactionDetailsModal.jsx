import React from "react";
import { motion } from "framer-motion";
import { X, ArrowUp, ArrowDown, User, ArrowLeftRight, FileText, } from "lucide-react";

function TransactionDetailsModal({ transaction, myAccountId, onClose }) {


    const isDebit = transaction.fromAccount._id === myAccountId;
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
                {/* Header */}

                <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200">

                    <div>

                        <h2 className="text-3xl font-bold">
                            Transaction Details
                        </h2>

                        <p className="text-gray-500 mt-2">
                            View complete transaction information
                        </p>

                    </div>

                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-black transition"
                    >
                        <X size={30} />
                    </button>

                </div>
                <div className="grid grid-cols-2 gap-6 p-8 border-b border-gray-200">

                    {/* Status */}
                    <div className="bg-green-50 rounded-2xl p-6 border border-green-100">

                        <p className="text-sm text-gray-500 mb-2">
                            Status
                        </p>

                        <div className="flex items-center gap-3">

                            <div className="w-3 h-3 rounded-full bg-green-500"></div>

                            <h3 className="text-xl font-bold text-green-600">
                                {transaction.status}
                            </h3>

                        </div>

                    </div>

                    {/* Type */}
                    <div className={`${isDebit ? "bg-red-50" : "bg-green-50"} rounded-2xl p-6 border ${isDebit?"border-red-100":"border-green-100"}`}>

                        <p className="text-sm text-gray-500 mb-2">
                            Type
                        </p>

                        <div className="flex items-center gap-3">

                            {isDebit ? (
                                <ArrowUp className="text-red-600" size={30} />
                            ) : (
                                <ArrowDown className="text-green-600" size={30} />
                            )}

                            <h3 className={`text-2xl font-bold ${isDebit ? "text-red-600" : "text-green-600"}`}>
                                {isDebit ? "DEBIT" : "CREDIT"}
                            </h3>

                        </div>

                    </div>

                </div>
                {/* Transaction Summary */}
                <div className="p-8 border-b border-gray-200">

                    <h3 className="text-xl font-bold mb-6">
                        Transaction Summary
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* Transaction ID */}
                        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">

                            <p className="text-sm text-gray-500">
                                Transaction ID
                            </p>

                            <h4 className="font-semibold text-lg mt-2">
                                TXN-{transaction._id.slice(-8).toUpperCase()}
                            </h4>

                        </div>

                        {/* Amount */}
                        <div className={`${isDebit?"bg-red-50":"bg-green-50"} rounded-2xl p-5 border ${isDebit? "border-red-100":"border-green-100"}`}>

                            <p className="text-sm text-gray-500">
                                Amount
                            </p>

                            <h4 className={`font-bold text-2xl ${isDebit?"text-red-600":"text-green-600"} mt-2`}>
                                {isDebit?"-":"+"}₹{transaction.amount}
                            </h4>

                        </div>

                        {/* Date */}
                        <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">

                            <p className="text-sm text-gray-500">
                                Date & Time
                            </p>

                            <h4 className="font-semibold mt-2">
                                {
                                    new Date(transaction.createdAt).toLocaleDateString("en-IN", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })
                                }
                            </h4>

                            <p className="text-gray-500 text-sm">
                                {
                                    new Date(transaction.createdAt).toLocaleTimeString("en-IN", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        second: undefined,
                                    })
                                }
                            </p>

                        </div>

                    </div>

                </div>
                {/* Transfer Details */}
                <div className="p-8 border-b border-gray-200">

                    <h3 className="text-xl font-bold mb-6">
                        Transfer Details
                    </h3>

                    <div className="space-y-5">

                        {/* From Account */}
                        <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-2xl p-5">

                            <div>
                                <p className="text-sm text-gray-500">
                                    From Account
                                </p>

                                <h4 className="text-lg font-semibold mt-1">
                                    {transaction.fromAccount?.user?.name}
                                </h4>

                                <p className="text-sm text-gray-500">
                                    ****{transaction.fromAccount?._id?.slice(-6).toUpperCase()}
                                </p>

                            </div>

                        </div>

                        {/* Arrow */}
                        <div className="flex justify-center">

                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">

                                <ArrowDown className="text-blue-600" size={24} />

                            </div>

                        </div>

                        {/* To Account */}
                        <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-2xl p-5">

                            <div>
                                <p className="text-sm text-gray-500">
                                    To Account
                                </p>

                                <h4 className="text-lg font-semibold mt-1">
                                    {transaction.toAccount?.user?.name}
                                </h4>

                                <p className="text-sm text-gray-500">
                                    ****{transaction.toAccount?._id?.slice(-6).toUpperCase()}
                                </p>

                            </div>

                        </div>

                    </div>

                </div>
                {/* More Information */}
                <div className="p-6">

                    <h3 className="text-lg font-semibold mb-4">
                        More Information
                    </h3>

                    <div className="border border-gray-200 rounded-2xl overflow-hidden">

                        {/* Counterparty */}
                        <div className="flex items-center gap-4 p-4 border-b border-gray-200">

                            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                                <User className="text-purple-600" size={22} />
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Counterparty
                                </p>

                                <h4 className="font-semibold">
                                    {isDebit
                                        ? transaction.toAccount.user.name
                                        : transaction.fromAccount.user.name}
                                </h4>
                            </div>

                        </div>

                        {/* Transfer Method */}


                        {/* Remarks */}
                        <div className="flex items-center gap-4 p-4">

                            <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                                <FileText className="text-yellow-600" size={22} />
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Remarks
                                </p>

                                <h4 className="font-semibold">
                                    Money Transfer
                                </h4>
                            </div>

                        </div>

                    </div>

                </div>
                {/* Footer */}
                <div className="flex justify-center items-center px-6 py-5 border-t border-gray-200 bg-gray-50">

                    <button
                        onClick={onClose}
                        className="px-10 py-3 rounded-xl border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
                    >
                        Close
                    </button>

                </div>

            </motion.div>
        </motion.div>
    );
}

export default TransactionDetailsModal;
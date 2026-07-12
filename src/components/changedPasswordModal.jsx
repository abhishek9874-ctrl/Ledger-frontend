import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, Lock, Eye, EyeOff, Save } from "lucide-react";
import axios from "axios";

function ChangedPasswordModal({ onClose }) {

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);



    const handleChangePassword = async () => {
        try {

            if (!currentPassword || !newPassword || !confirmPassword) {
                return alert("Please fill all fields.");
            }

            if (newPassword !== confirmPassword) {
                return alert("Passwords do not match.");
            }

            const token = localStorage.getItem("token");

            const response = await axios.put(
                "http://localhost:3000/api/auth/changedPassword",
                {
                    currentPassword,
                    newPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert(response.data.message);
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

            onClose();

        } catch (err) {
            alert(err.response?.data?.message);
        }
    };

    return (



        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-3xl w-full max-w-xl p-8 shadow-2xl"
            >
                {/* Header */}
                <div className="flex items-center justify-between">

                    <div>
                        <h2 className="text-4xl font-bold">
                            Change Password
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Update your account password
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-black transition"
                    >
                        <X size={30} />
                    </button>

                </div>
                <div className="mt-8">

                    <label className="block text-lg font-semibold mb-3">
                        Current Password
                    </label>

                    <div className="flex items-center border border-gray-300 rounded-xl px-4 py-4">

                        <Lock size={22} className="text-gray-500" />

                        <input
                            type={showCurrentPassword ? "text" : "password"}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="Enter your current password"
                            className="ml-4 w-full outline-none text-lg"

                        />
                        <button
                            type="button"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                            {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>

                    </div>

                    <p className="text-sm text-gray-500 mt-3">
                        Enter your current account password.
                    </p>

                </div>
                <div className="mt-8">

                    <label className="block text-lg font-semibold mb-3">
                        New Password
                    </label>

                    <div className="flex items-center border border-gray-300 rounded-xl px-4 py-4">

                        <Lock size={22} className="text-gray-500" />

                        <input
                            type={showNewPassword ? "text" : "password"}

                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter your new password"
                            className="ml-4 w-full outline-none text-lg"
                        />
                        <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                            {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>

                    </div>

                    <p className="text-sm text-gray-500 mt-3">
                        Password must contain at least 6 characters.
                    </p>

                </div>
                <div className="mt-8">

                    <label className="block text-lg font-semibold mb-3">
                        Confirm New Password
                    </label>

                    <div className="flex items-center border border-gray-300 rounded-xl px-4 py-4">

                        <Lock
                            size={22}
                            className="text-gray-500"
                        />

                        <input
                            type={showConfirmPassword ? "text" : "password"}

                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm your new password"
                            className="ml-4 w-full outline-none text-lg"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>

                    </div>

                    <p className="text-sm text-gray-500 mt-3">
                        Re-enter your new password to confirm.
                    </p>

                </div>
                <div className="flex justify-end gap-4 mt-10 pt-6 border-t border-gray-200">

                    <button
                        onClick={onClose}
                        className="px-8 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleChangePassword}
                        className="flex items-center gap-2 px-8 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
                    >
                        <Save size={18} />
                        Change Password
                    </button>

                </div>

            </motion.div>
        </motion.div>
    );
}

export default ChangedPasswordModal;
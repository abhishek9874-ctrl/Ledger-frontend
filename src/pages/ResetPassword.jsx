import React, { useState } from "react";
import { MdAccountBalance } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

function ResetPassword() {

    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        try {

            setLoading(true);

            await api.post(
                `/auth/reset-password/${token}`,
                {
                    password
                }
            );

            setSuccess(true);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Something went wrong. Please try again."
            );

        } finally {

            setLoading(false);

        }
    };


    return (
        <div>

            {/* Logo */}
            <div className="px-10 md:px-17 py-8">

                <div className="flex items-center gap-2">

                    <MdAccountBalance
                        className="text-4xl text-blue-800"
                    />

                    <h1 className="text-xl md:text-2xl font-bold">
                        Backend Ledger
                    </h1>

                </div>

            </div>


            <section className="min-h-screen bg-gray-50 flex items-center justify-center px-6">

                <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-16 items-center">


                    {/* Left Side */}
                    <div>

                        <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">

                            Create a
                            <br />

                            <span className="text-blue-600">
                                new password.
                            </span>

                        </h1>


                        <p className="mt-6 text-xl text-gray-600">

                            Choose a strong password to keep your
                            Backend Ledger account secure.

                        </p>


                        <div className="mt-12 space-y-8">

                            {/* Security */}
                            <div className="flex items-start gap-4">

                                <div className="bg-blue-100 p-4 rounded-xl">

                                    <FaLock
                                        className="text-blue-600"
                                        size={24}
                                    />

                                </div>


                                <div>

                                    <h3 className="font-semibold text-xl">
                                        Secure Password
                                    </h3>

                                    <p className="text-gray-600 mt-1">
                                        Use a password that is difficult
                                        for others to guess.
                                    </p>

                                </div>

                            </div>


                            {/* Password */}
                            <div className="flex items-start gap-4">

                                <div className="bg-blue-100 p-4 rounded-xl">

                                    <FaLock
                                        className="text-blue-600"
                                        size={24}
                                    />

                                </div>


                                <div>

                                    <h3 className="font-semibold text-xl">
                                        Protect Your Account
                                    </h3>

                                    <p className="text-gray-600 mt-1">
                                        Your new password will replace
                                        your old password.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* Right Side */}
                    <div className="bg-white p-10 md:p-15 rounded-3xl shadow-lg w-full max-w-xl">


                        {!success ? (

                            <>

                                {/* Back */}
                                <div className="flex justify-start mb-6">

                                    <Link
                                        to="/login"
                                        className="text-blue-600 hover:underline"
                                    >
                                        ← Back to Login
                                    </Link>

                                </div>


                                {/* Icon */}
                                <div className="flex justify-center mb-6">

                                    <div className="bg-blue-100 p-5 rounded-full">

                                        <FaLock
                                            className="text-blue-600"
                                            size={32}
                                        />

                                    </div>

                                </div>


                                {/* Heading */}
                                <h2 className="text-4xl font-bold text-center text-slate-900">

                                    Reset Password

                                </h2>


                                <p className="text-center text-gray-500 mt-3">

                                    Enter your new password below.

                                </p>


                                {/* Error */}
                                {error && (

                                    <p className="mt-5 text-sm text-red-600 text-center">
                                        {error}
                                    </p>

                                )}


                                <form
                                    onSubmit={handleSubmit}
                                    className="mt-10 space-y-6"
                                >


                                    {/* New Password */}
                                    <div>

                                        <label className="font-medium">
                                            New Password
                                        </label>


                                        <div className="mt-2 border border-gray-200 rounded-xl px-4 py-4 flex items-center gap-4">

                                            <FaLock className="text-gray-400" />


                                            <input
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                value={password}
                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }
                                                placeholder="Enter new password"
                                                className="w-full outline-none"
                                                required
                                            />


                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowPassword(!showPassword)
                                                }
                                                className="text-sm text-blue-600"
                                            >
                                                {showPassword
                                                    ? "Hide"
                                                    : "Show"}
                                            </button>

                                        </div>

                                    </div>


                                    {/* Confirm Password */}
                                    <div>

                                        <label className="font-medium">
                                            Confirm Password
                                        </label>


                                        <div className="mt-2 border border-gray-200 rounded-xl px-4 py-4 flex items-center gap-4">

                                            <FaLock className="text-gray-400" />


                                            <input
                                                type={
                                                    showConfirmPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                value={confirmPassword}
                                                onChange={(e) =>
                                                    setConfirmPassword(e.target.value)
                                                }
                                                placeholder="Confirm new password"
                                                className="w-full outline-none"
                                                required
                                            />


                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowConfirmPassword(
                                                        !showConfirmPassword
                                                    )
                                                }
                                                className="text-sm text-blue-600"
                                            >
                                                {showConfirmPassword
                                                    ? "Hide"
                                                    : "Show"}
                                            </button>

                                        </div>

                                    </div>


                                    {/* Password requirement */}
                                    <p className="text-sm text-gray-500">
                                        Password must be at least 6 characters.
                                    </p>


                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-blue-600 text-white py-4 rounded-xl font-medium hover:bg-blue-700 transition disabled:opacity-60"
                                    >

                                        {loading
                                            ? "Resetting Password..."
                                            : "Reset Password"}

                                    </button>


                                    {/* Login */}
                                    <div className="text-center pt-4">

                                        <Link
                                            to="/login"
                                            className="text-blue-600 font-medium hover:underline"
                                        >
                                            Back to Login
                                        </Link>

                                    </div>

                                </form>

                            </>

                        ) : (

                            /* Success */
                            <div className="text-center py-8">

                                <div className="text-green-600 text-5xl">
                                    ✓
                                </div>


                                <h2 className="text-3xl font-bold text-slate-900 mt-5">

                                    Password Reset Successful!

                                </h2>


                                <p className="text-gray-500 mt-3">

                                    Your password has been successfully
                                    updated.

                                </p>


                                <button
                                    onClick={() => navigate("/login")}
                                    className="mt-8 w-full bg-blue-600 text-white py-4 rounded-xl font-medium hover:bg-blue-700 transition"
                                >
                                    Go to Login
                                </button>

                            </div>

                        )}

                    </div>

                </div>

            </section>

        </div>
    );
}

export default ResetPassword;
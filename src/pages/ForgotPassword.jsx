import React, { useState } from "react";
import { MdAccountBalance } from "react-icons/md";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../api/axios";

function ForgotPassword() {

    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("")
        setSuccess(false)

        try {
            const response = await api.post(
                "/auth/forgotPassword",
                {
                    email
                }
            );

            setSuccess(true)

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Something went wrong. Please try again."
            );

        }
    };


    return (
        <div>

            {/* Logo */}
            <div className="px-10  md:px-17 py-8">
                <div className="flex items-center gap-2">
                    <MdAccountBalance className="text-4xl text-blue-800" />

                    <h1 className="text-xl md:text-2xl  font-bold">
                        Backend Ledger
                    </h1>
                </div>
            </div>


            <section className="min-h-screen bg-gray-50 flex items-center justify-center px-6">

                <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-16 items-center">


                    {/* Left Side */}
                    <div>

                        <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                            Forgot your
                            <br />
                            <span className="text-blue-600">
                                password?
                            </span>
                        </h1>


                        <p className="mt-6 text-xl text-gray-600">
                            Don't worry. We'll help you reset your password
                            and get back to managing your finances.
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
                                        Secure Reset
                                    </h3>

                                    <p className="text-gray-600 mt-1">
                                        Your password reset process is
                                        protected and secure.
                                    </p>
                                </div>

                            </div>


                            {/* Email */}
                            <div className="flex items-start gap-4">

                                <div className="bg-blue-100 p-4 rounded-xl">
                                    <FaEnvelope
                                        className="text-blue-600"
                                        size={24}
                                    />
                                </div>

                                <div>
                                    <h3 className="font-semibold text-xl">
                                        Check Your Email
                                    </h3>

                                    <p className="text-gray-600 mt-1">
                                        We'll send a password reset link
                                        to your registered email.
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>


                    {/* Right Side */}
                    <div className="bg-white p-15 rounded-3xl shadow-lg w-full max-w-xl">

                        <div className="flex justify-start mb-6">
                            <Link
                                to="/login"
                                className="text-blue-600 hover:underline"
                            >
                                ← Back to Login
                            </Link>
                        </div>


                        <div className="flex justify-center mb-6">

                            <div className="bg-blue-100 p-5 rounded-full">
                                <FaLock
                                    className="text-blue-600"
                                    size={32}
                                />
                            </div>

                        </div>


                        <h2 className="text-4xl font-bold text-center text-slate-900">
                            Forgot Password?
                        </h2>


                        <p className="text-center text-gray-500 mt-3">
                            Enter your registered email address and we'll
                            send you a link to reset your password.
                        </p>
                        {error && (
                            <p className="mt-4 text-sm text-red-600 text-center">
                                {error}
                            </p>
                        )}


                        <form
                            onSubmit={handleSubmit}
                            className="mt-10 space-y-6"
                        >
                            {success && (
                                <div className="mt-6 text-center">

                                    <div className="text-green-600 text-4xl">
                                        ✓
                                    </div>

                                    <h3 className="text-2xl font-bold text-slate-900 mt-3">
                                        Check Your Email!
                                    </h3>

                                    <p className="text-gray-500 mt-2">
                                        We've sent a password reset link to
                                    </p>

                                    <p className="font-semibold text-slate-900 mt-1">
                                        {email}
                                    </p>

                                </div>
                            )}

                            {/* Email */}
                            <div>

                                <label className="font-medium">
                                    Email Address
                                </label>

                                <div className="mt-2 border hover:shadow-lg transition-all duration-300 border-gray-200 rounded-xl px-4 py-4 flex items-center gap-4">

                                    <FaEnvelope className="text-gray-400" />

                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your registered email"
                                        className="w-full outline-none"
                                        required
                                    />

                                </div>

                            </div>


                            {/* Button */}
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-4 rounded-xl font-medium hover:bg-blue-700 transition"
                            >
                                Send Reset Link
                            </button>


                            {/* Back to Login */}
                            <div className="text-center pt-4">

                                <Link
                                    to="/login"
                                    className="text-blue-600 font-medium hover:underline"
                                >
                                    Back to Login
                                </Link>

                            </div>

                        </form>

                    </div>

                </div>

            </section>

        </div>
    );
}

export default ForgotPassword;
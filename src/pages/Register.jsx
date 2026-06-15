import React, { useState } from 'react'
import axios from "axios"
import { MdAccountBalance } from 'react-icons/md'
import { Shield, BarChart3, Zap } from "lucide-react";
import { FaUser, FaEnvelope, FaLock, FaGoogle, FaGithub } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

function Register() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response=await axios.post(
                "http://localhost:3000/api/auth/register",formData
            );
            localStorage.setItem("token", response.data.token);

            console.log(response.data)
        } catch (err) {
            console.log(err.response?.data);
        }
    }
    return (
        <div>
            {/* Logo */}
            <div className='px-17 py-8'>
                <div className='flex items-center gap-2'>
                    <MdAccountBalance className='text-4xl text-blue-800' />
                    <h1 className='text-xl md:text-2xl font-bold'>
                        Backend Ledger
                    </h1>
                </div>
            </div>

            <section className='min-h-screen bg-gray-50 flex items-center justify-center px-6'>

                <div className='max-w-7xl w-full grid lg:grid-cols-2 gap-16 items-center'>

                    {/* Left Side */}
                    <div>

                        <h1 className='text-5xl lg:text-6xl font-bold text-slate-900 leading-tight'>
                            Create your account
                            <br />
                            and get{" "}
                            <span className='text-blue-600'>
                                started
                            </span>
                        </h1>

                        <p className="mt-6 text-xl text-gray-600">
                            Join Backend Ledger and take control of your finances
                            with secure and smart tracking.
                        </p>

                        <div className='mt-12 space-y-8'>

                            {/* Secure & Private */}
                            <div className='flex items-start gap-4'>
                                <div className="bg-blue-100 p-4 rounded-xl">
                                    <Shield className="text-blue-600" size={24} />
                                </div>

                                <div>
                                    <h3 className='font-semibold text-xl'>
                                        Secure & Private
                                    </h3>

                                    <p className="text-gray-600 mt-1">
                                        Your data is protected with bank-level
                                        security and encryption.
                                    </p>
                                </div>
                            </div>

                            {/* Track Everything */}
                            <div className='flex items-start gap-4'>
                                <div className="bg-blue-100 p-4 rounded-xl">
                                    <BarChart3 className="text-blue-600" size={24} />
                                </div>

                                <div>
                                    <h3 className='font-semibold text-xl'>
                                        Track Everything
                                    </h3>

                                    <p className="text-gray-600 mt-1">
                                        Monitor all your accounts and transactions
                                        in one place.
                                    </p>
                                </div>
                            </div>

                            {/* Fast & Easy */}
                            <div className='flex items-start gap-4'>
                                <div className="bg-blue-100 p-4 rounded-xl">
                                    <Zap className="text-blue-600" size={24} />
                                </div>

                                <div>
                                    <h3 className='font-semibold text-xl'>
                                        Fast & Easy
                                    </h3>

                                    <p className="text-gray-600 mt-1">
                                        Get started in minutes and manage your
                                        finances effortlessly.
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>

                    {/* Right side */}


                    <div className="bg-white p-15 rounded-3xl shadow-lg w-full max-w-xl">

                        <h2 className="text-4xl font-bold text-center text-slate-900">
                            Create Account
                        </h2>

                        <p className="text-center text-gray-500 mt-3">
                            Fill in the details below to create your account
                        </p>

                        <form onSubmit={handleSubmit} className="mt-10 space-y-6">

                            {/* Full Name */}
                            <div>
                                <label className="font-medium">Full Name</label>

                                <div className="mt-2 border  hover:shadow-lg transition-all duration-300 border-gray-200 rounded-xl px-4 py-4 flex items-center gap-4">
                                    <FaUser className="text-gray-400" />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                        className="w-full outline-none"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="font-medium">Email Address</label>

                                <div className="mt-2 border hover:shadow-lg transition-all duration-300 border-gray-200 rounded-xl px-4 py-4 flex items-center gap-4">
                                    <FaEnvelope className="text-gray-400" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email address"
                                        className="w-full outline-none"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="font-medium">Password</label>

                                <div className="mt-2 border hover:shadow-lg transition-all duration-300 border-gray-200 rounded-xl px-4 py-4 flex items-center gap-4">
                                    <FaLock className="text-gray-400" />
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        className="w-full outline-none"
                                    />
                                    <IoEyeOutline className="text-gray-400 cursor-pointer" />
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="font-medium">Confirm Password</label>

                                <div className="mt-2 border hover:shadow-lg transition-all duration-300 border-gray-200 rounded-xl px-4 py-4 flex items-center gap-4">
                                    <FaLock className="text-gray-400" />
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm your password"
                                        className="w-full outline-none"
                                    />
                                    <IoEyeOutline className="text-gray-400 cursor-pointer" />
                                </div>
                            </div>

                            {/* Button */}
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-4 rounded-xl font-medium hover:bg-blue-700 transition"
                            >
                                Create Account
                            </button>

                            {/* Divider */}
                            <div className="flex items-center gap-4">
                                <div className="flex-1 h-px bg-gray-300"></div>

                                <span className="text-gray-500">
                                    or sign up with
                                </span>

                                <div className="flex-1 h-px bg-gray-300"></div>
                            </div>

                            {/* Social Buttons */}
                            <div className="grid grid-cols-2 gap-4">

                                <button
                                    type="button"
                                    className="border border-gray-200 rounded-xl py-3 flex items-center justify-center gap-3 hover:bg-gray-50"
                                >
                                    <FaGoogle />
                                    Google
                                </button>

                                <button
                                    type="button"
                                    className="border border-gray-200 rounded-xl py-3 flex items-center justify-center gap-3 hover:bg-gray-50"
                                >
                                    <FaGithub />
                                    GitHub
                                </button>

                            </div>

                            {/* Login Link */}
                            <p className="text-center text-gray-500">
                                Already have an account?{" "}
                                <Link to={"/login"}>
                                    <span className="text-blue-600 font-medium cursor-pointer">
                                        Login
                                    </span>
                                </Link>
                            </p>

                        </form>

                    </div>

                </div>

            </section>
        </div>
    )
}

export default Register
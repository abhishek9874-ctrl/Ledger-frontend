import React from 'react'
import api from "../api/axios";
import { useEffect, useState } from "react";
import SideBar from '../components/SideBar'
import Header from '../components/Header'
import { Mail, CreditCard, ShieldCheck, CalendarDays, Clock3, UserRound, Pencil, Lock } from "lucide-react";
import EditProfileModal from "../components/EditProfileModal";
import ChangedPasswordModal from '../components/changedPasswordModal';
import { AnimatePresence } from "framer-motion";

function Profile() {


    const [profile, setProfile] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);



    const fetchProfile = async () => {
        try {

            

            const response = await api.get(
                "/account/profile"
            );

            setProfile(response.data.account);

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);





    return (
        <div className='flex flex-col md:flex-row min-h-screen bg-gray-50'>
            <SideBar />
            <div className='flex-1 bg-gray-50'>
                <Header />
                <div className="max-w-5xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
                    <div className="bg-white  rounded-3xl shadow-sm border hover:shadow-lg transition-all duration-300 border-gray-100 p-8">

                        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-10 lg:gap-20">

                            {/* Left Side */}
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">

                                {/* Avatar */}
                                <div className="relative">

                                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-blue-50 flex items-center justify-center">

                                        <span className="text-4xl sm:text-5xl font-bold text-blue-600">
                                            {profile?.user?.name
                                                ?.split(" ")
                                                .map(word => word[0])
                                                .join("")
                                            }
                                        </span>

                                    </div>

                                </div>

                                {/* User Info */}
                                <div>

                                    <div className="flex items-center gap-2">

                                        <h2 className="text-2xl sm:text-3xl font-bold">
                                            {profile?.user?.name}
                                        </h2>

                                        <UserRound
                                            className="text-blue-600"
                                            size={20}
                                        />

                                    </div>

                                    <span className="inline-block mt-2 px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-medium">
                                        Verified User
                                    </span>

                                    <div className="mt-5 space-y-4">

                                        <div className="flex items-center gap-3">

                                            <Mail
                                                size={18}
                                                className="text-gray-500"
                                            />

                                            <span className="text-gray-700">
                                                {profile?.user?.email}
                                            </span>

                                        </div>

                                        <div className="flex items-center gap-3">

                                            <CreditCard
                                                size={18}
                                                className="text-gray-500"
                                            />

                                            <span className="text-gray-700">
                                                A/C ••••{profile?._id?.slice(-6).toUpperCase()}
                                            </span>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            {/* Divider */}
                            <div className="hidden lg:block h-32 w-px bg-gray-200"></div>

                            {/* Right Side */}
                            <div className="space-y-6 w-full lg:w-auto">

                                <div className="flex items-center gap-4 justify-center lg:justify-start">

                                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">

                                        <CalendarDays
                                            className="text-blue-600"
                                            size={22}
                                        />

                                    </div>

                                    <div>

                                        <p className="text-gray-500 text-sm">
                                            Member since
                                        </p>

                                        <h4 className="font-semibold text-lg">
                                            {profile?.createdAt &&
                                                new Date(profile.createdAt).toLocaleDateString("en-IN", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                })
                                            }
                                        </h4>

                                    </div>

                                </div>

                                <div className="flex items-center gap-4 justify-center lg:justify-start">

                                    <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">

                                        <ShieldCheck
                                            className="text-green-600"
                                            size={22}
                                        />

                                    </div>

                                    <div>

                                        <p className="text-gray-500 text-sm">
                                            Account Status
                                        </p>

                                        <h4 className="font-semibold text-lg text-green-600">
                                            {profile?.status}
                                        </h4>

                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* Buttons */}

                        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-10">

                            <button
                                onClick={() => setShowEditModal(true)}
                                className="w-full sm:w-auto px-8 py-3 border-2 border-blue-500 rounded-xl text-blue-600 font-semibold flex items-center gap-2 hover:bg-blue-50 hover:scale-[1.01] transition-all duration-300 ">

                                <Pencil size={18} />

                                Edit Profile

                            </button>

                            <button
                            onClick={()=>setShowChangePasswordModal(true)}
                             className="w-full sm:w-auto px-8 py-3 border-2 border-purple-500 rounded-xl text-purple-600 font-semibold flex items-center gap-2 hover:bg-purple-50 hover:scale-[1.01] transition-all duration-300 ">

                                <Lock size={18} />

                                Change Password

                            </button>

                        </div>

                    </div>
                </div>
            </div>
            <AnimatePresence>
                {showEditModal && (
                    <EditProfileModal
                        profile={profile}
                        fetchProfile={fetchProfile}
                        onClose={() => setShowEditModal(false)}
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {showChangePasswordModal && (
                    <ChangedPasswordModal
                    profile={profile}
                    onClose={()=>setShowChangePasswordModal(false)}
                    />
                )}
            </AnimatePresence>
        </div>

    )
}

export default Profile

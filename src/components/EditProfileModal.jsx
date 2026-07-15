import React from 'react'
import { X } from "lucide-react";
import { User, Mail, Save } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import axios from "axios";

function EditProfileModal({ profile, onClose, fetchProfile }) {

  const [name, setName] = useState(profile?.user?.name || "");
  const [email, setEmail] = useState(profile?.user?.email || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  const handleSave = async () => {
    try {
      setError("");
      setSuccess("");
      setLoading(true);

      const token = localStorage.getItem("token");

      await axios.put(
        "http://localhost:3000/api/auth/profile",
        {
          name,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchProfile();

      setSuccess("Profile updated successfully!");

      onClose();

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
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
        initial={{
          opacity: 0,
          scale: 0.9,
          y: 20,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.9,
          y: 20,
        }}
        transition={{
          duration: 0.25,
          ease: "easeOut",
        }}
        className="bg-white rounded-3xl w-full max-w-xl p-8 shadow-2xl"
      >
        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-4xl font-bold">
              Edit Profile
            </h2>

            <p className="text-gray-500 mt-2">
              Update your personal information
            </p>
            {/* Success Message */}
            {success && (
              <div className="mt-4 rounded-xl bg-green-50 border border-green-200 p-3 text-green-700">
                {success}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mt-4 rounded-xl bg-red-50 border border-red-200 p-3 text-red-700">
                {error}
              </div>
            )}


          </div>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black transition"
          >
            <X size={30} />
          </button>


        </div>
        <div className="mt-8 space-y-8">

          {/* Full Name */}
          <div>

            <label className="block text-lg font-semibold mb-3">
              Full Name
            </label>

            <div className="flex items-center border border-gray-300 rounded-xl px-4 py-4">

              <User size={22} className="text-gray-500" />

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="ml-4 w-full outline-none text-lg"
              />

            </div>

            <p className="text-sm text-gray-500 mt-3">
              This is how your name will appear on your account.
            </p>

          </div>

          <hr className="border-gray-200" />

          {/* Email */}
          <div>

            <label className="block text-lg font-semibold mb-3">
              Email Address
            </label>

            <div className="flex items-center border border-gray-300 rounded-xl px-4 py-4">

              <Mail size={22} className="text-gray-500" />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="ml-4 w-full outline-none text-lg"
              />

            </div>

            <p className="text-sm text-gray-500 mt-3">
              We'll never share your email with anyone else.
            </p>

          </div>

        </div>
        <div className="flex justify-end gap-4 mt-10 pt-6 border-t border-gray-200">

          <button
            onClick={onClose}
            className="px-8 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 px-8 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={18} />
            {loading ? "Saving..." : "Save Changes"}
          </button>

        </div>

      </motion.div>

    </motion.div>

  )
}

export default EditProfileModal

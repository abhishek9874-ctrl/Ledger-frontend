import React from 'react'
import Navbar from '../components/Navbar'
import { motion } from "framer-motion";
import { Wallet, Send, FileText, ChartColumn, User, ShieldCheck, Target, CheckCircle, Mail } from "lucide-react";
import { FaGithub,} from "react-icons/fa";
import { MdAccountBalance } from "react-icons/md";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

function About() {
  return (
    <div>
      <Navbar />
      <section className="bg-gradient-to-r from-blue-100 via-white  to-white py-20">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-2 items-center gap-12">

            {/* Left Side */}

            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >

              <p className="text-blue-600 font-semibold uppercase tracking-wider">
                About Us
              </p>

              <h1 className="text-5xl font-bold text-slate-900 mt-4 leading-tight">
                About LEDGERLY
              </h1>

              <p className="mt-6 text-lg text-gray-600 leading-9 max-w-xl">
                LEDGERLY is a modern digital banking application
                that helps you manage accounts, transfer money securely,
                and track your financial activity with ease.
              </p>

              <div className="mt-8 w-20 h-1 rounded-full bg-blue-600"></div>

            </motion.div>

            {/* Right Side */}

            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >

              <img
                src="/about-hero.png"
                alt="About Backend Ledger"
                className="w-full max-w-lg"
              />

            </motion.div>

          </div>

        </div>
      </section>
      <section className="py-24 bg-white">
        <motion.div
          className="max-w-5xl mx-auto px-6 text-center"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >

          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center">
              <Target className="w-10 h-10 text-blue-600" />
            </div>
          </div>

          {/* Heading */}
          <h2 className="mt-8 text-5xl font-bold text-slate-900">
            Our Mission
          </h2>

          {/* Description */}
          <p className="mt-8 text-lg text-gray-600 leading-9 max-w-3xl mx-auto">
            We believe banking should be simple, secure, and accessible to everyone.
            Our mission is to provide a seamless digital banking experience that
            empowers you to take control of your finances anytime, anywhere.
          </p>

          {/* Blue Line */}
          <div className="mt-8 flex justify-center">
            <div className="w-24 h-1 rounded-full bg-blue-600"></div>
          </div>

        </motion.div>
      </section>
      {/* What You Can Do */}
      <section className="py-20 bg-white border-t border-gray-200">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center text-slate-900">
            What You Can Do
          </h2>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 mt-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >

            {/* Card 1 */}
            <motion.div
              variants={itemVariants}
              whileHover={{
                y: -8,
                scale: 1.05,
              }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center text-center"
            >

              <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center">
                <Wallet className="w-9 h-9 text-blue-600" />
              </div>

              <h3 className="mt-6 font-semibold text-lg">
                Manage Accounts
              </h3>

              <p className="mt-3 text-gray-500 text-sm leading-7">
                Create and manage multiple bank accounts with ease.
              </p>

            </motion.div>

            {/* Card 2 */}
            <motion.div
              variants={itemVariants}
              whileHover={{
                y: -8,
                scale: 1.05,
              }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center text-center"
            >

              <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center">
                <Send className="w-9 h-9 text-blue-600" />
              </div>

              <h3 className="mt-6 font-semibold text-lg">
                Money Transfers
              </h3>

              <p className="mt-3 text-gray-500 text-sm leading-7">
                Transfer money securely between accounts in seconds.
              </p>

            </motion.div>

            {/* Card 3 */}
            <motion.div
              variants={itemVariants}
              whileHover={{
                y: -8,
                scale: 1.05,
              }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center text-center"
            >

              <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center">
                <FileText className="w-9 h-9 text-blue-600" />
              </div>

              <h3 className="mt-6 font-semibold text-lg">
                Transaction History
              </h3>

              <p className="mt-3 text-gray-500 text-sm leading-7">
                View and track all your transactions in one place.
              </p>

            </motion.div>

            {/* Card 4 */}
            <motion.div
              variants={itemVariants}
              whileHover={{
                y: -8,
                scale: 1.05,
              }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center text-center"
            >

              <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center">
                <ChartColumn className="w-9 h-9 text-blue-600" />
              </div>

              <h3 className="mt-6 font-semibold text-lg">
                Review Your Activity
              </h3>

              <p className="mt-3 text-gray-500 text-sm leading-7">
                Review your account balances and track your financial activity in one place.
              </p>

            </motion.div>

            {/* Card 5 */}
            <motion.div
              variants={itemVariants}
              whileHover={{
                y: -8,
                scale: 1.05,
              }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center text-center"
            >

              <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center">
                <User className="w-9 h-9 text-blue-600" />
              </div>

              <h3 className="mt-6 font-semibold text-lg">
                Profile Management
              </h3>

              <p className="mt-3 text-gray-500 text-sm leading-7">
                Update your profile information and preferences.
              </p>

            </motion.div>

            {/* Card 6 */}
            <motion.div
              variants={itemVariants}
              whileHover={{
                y: -8,
                scale: 1.05,
              }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center text-center"
            >

              <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center">
                <ShieldCheck className="w-9 h-9 text-blue-600" />
              </div>

              <h3 className="mt-6 font-semibold text-lg">
                Secure & Protected
              </h3>

              <p className="mt-3 text-gray-500 text-sm leading-7">
                Your data is protected with secure authentication and protected routes.
              </p>

            </motion.div>

          </motion.div>

        </div>

      </section>
      {/* Security Section */}
      <section className="py-20 border-t border-gray-200 bg-white">

        <div className="max-w-6xl mx-auto px-6">

          <div className="grid lg:grid-cols-2 items-center gap-16">

            {/* Left Side */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >

              <img
                src="/security.png"
                alt="Security"
                className="w-full max-w-sm"
              />

            </motion.div>

            {/* Right Side */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >

              <h2 className="text-4xl font-bold text-slate-900">
                Security You Can Trust
              </h2>

              <p className="mt-5 text-gray-600 leading-8 max-w-lg">
                We use industry-standard security practices to keep
                your data safe and your transactions secure.
              </p>

              <div className="mt-8 space-y-5">

                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700 font-medium">
                    JWT based authentication
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700 font-medium">
                    Encrypted passwords
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700 font-medium">
                    Protected routes
                  </span>
                </div>

              </div>

            </motion.div>

          </div>

        </div>

      </section>
      {/* Developer Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">

          <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-8">

            <div className="grid md:grid-cols-2 gap-10 items-center">

              {/* Left */}
              <div className="flex items-center gap-6">

                <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center">
                  <img
                    src="/profile.png"
                    alt="Developer"
                    className="w-16 h-16 object-cover rounded-full"
                  />
                </div>

                <div>

                  <p className="text-gray-600 font-medium">
                    Developed with 💙
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    Abhishek Kumar Singh
                  </h2>

                  <p className="text-gray-500 mt-3">
                    Electronics & Telecommunication Engineering
                  </p>

                  <p className="text-gray-500">
                    VSSUT, Burla
                  </p>

                </div>

              </div>

              {/* Right */}
              <div className="md:border-l border-gray-200 md:pl-10">

                <h3 className="text-2xl font-bold">
                  Let's Connect!
                </h3>

                <p className="text-gray-500 mt-3">
                  Feel free to connect with me on the platforms below.
                </p>

                <div className="flex items-center gap-5 mt-8">

                  <a
                    href="https://github.com/abhishek9874-ctrl"
                    target="_blank"
                    rel="noreferrer"
                    className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-900 hover:text-white transition flex items-center justify-center"
                  >
                    <FaGithub size={24} />
                  </a>



                  <a
                    href="mailto:kumarabhishekso9874@gmail.com"
                    className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition flex items-center justify-center"
                  >
                    <Mail size={24} />
                  </a>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-6">

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">

            {/* Logo */}
            <div className="flex items-center gap-3">
              <MdAccountBalance className="text-3xl text-blue-700" />
              <h2 className="text-xl font-bold text-slate-900">
                LEDGERLY
              </h2>
            </div>

            {/* Copyright */}
            <p className="text-gray-500 text-sm text-center">
              © {new Date().getFullYear()} LEDGERLY. All rights reserved.
            </p>
          </div>

        </div>
      </footer>

    </div>
  )
}

export default About

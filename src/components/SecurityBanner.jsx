import React from 'react'
import { Shield, ArrowRight } from "lucide-react";

function SecurityBanner() {
  return (
    <section>
        <div className="max-w-7xl mx-auto">

        <div className="bg-blue-50 border border-gray-200 rounded-2xl px-6 py-5 flex flex-col md:flex-row items-center justify-between hover:shadow-lg transition-all duration-300">

          {/* Left Side */}
          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
              <Shield
                size={24}
                className="text-blue-600"
              />
            </div>

            <p className="text-gray-600 text-lg">
              Built with security, transparency and reliability in mind.
            </p>

          </div>

          {/* Right Side */}
          <button className="mt-4 md:mt-0 flex items-center gap-2 text-blue-600 font-medium hover:gap-3 transition-all duration-300">

            Learn more about security

            <ArrowRight
              size={18}
            />

          </button>

        </div>

      </div>
    </section>
  )
}

export default SecurityBanner

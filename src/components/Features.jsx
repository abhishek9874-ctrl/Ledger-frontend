import React from 'react'
import {
    Wallet,
    ArrowLeftRight,
    PieChart,
    ShieldCheck,
} from "lucide-react";

function Features() {

    const features = [

        {
            icon: <Wallet size={30} className='text-blue-500' />,
            title: "Accounts",
            description: "Create and manage multiple accounts with ease.",
            bg: "bg-blue-100",
        },
        {
            icon: <ArrowLeftRight size={30} className='text-green-500' />,
            title: "Transactions",
            description: "Send and receive money instantly and securely.",
            bg: "bg-blue-100",
        },
        {
            icon: <PieChart size={30} className="text-purple-500" />,
            title: "Balance Tracking",
            description:
                "Real-time balance updates and transaction history.",
            bg: "bg-purple-100",
        },
        {
            icon: <ShieldCheck size={30} className="text-orange-500" />,
            title: "Secure & Reliable",
            description:
                "Your data is protected with bank-level security.",
            bg: "bg-orange-100",
        },

    ]



    return (
        <section className='py-26 px-6'>
            <div className='text-center'>
                <h1 className='font-bold text-4xl text-slate-900'>Everything you need in one place</h1>
                <p className="mt-4 text-gray-500 text-lg">
                    Powerful features to simplify your financial management
                </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16'>

                {features.map((feature, index) => (
                    <div key={index} className='bg-white p-8 border border-gray-100 shadow-sm  hover:shadow-xl transition-all duration-300'>
                        <div className={`${feature.bg} w-16 h-16 rounded-2xl flex items-center justify-center `} >
                            {feature.icon}
                        </div>
                        <h2 className="mt-6 text-2xl font-semibold">
                            {feature.title}
                        </h2>

                        <p className="mt-4 text-gray-500 leading-7">
                            {feature.description}
                        </p>
                    </div>
                ))}

            </div>

        </section>
    )
}

export default Features

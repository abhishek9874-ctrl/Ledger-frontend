import React, { useState } from "react";
import { WifiOff } from "lucide-react";
import api from "../api/axios";

function ServerError() {
    const [loading, setLoading] = useState(false);
    const handleRetry = async () => {
        setLoading(true);
        try {
            await api.get("/health");
        } catch (error) {
            console.log("Server is still unavailable.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="fixed inset-0 bg-gray-50 flex items-center justify-center z-[9999]">

            <div className="text-center px-6">

                <div className="w-20 h-20 mx-auto rounded-full bg-red-100 flex items-center justify-center">
                    <WifiOff
                        size={40}
                        className="text-red-500"
                    />
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mt-6">
                    Unable to connect to server
                </h1>

                <p className="text-gray-500 mt-3 max-w-md">
                    Backend Ledger is currently unable to connect to the server.
                    Please try again in a moment.
                </p>

                <button
                    onClick={handleRetry}
                    disabled={loading}
                    className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Checking server..." : "Try Again"}
                </button>

            </div>

        </div>
    );
}

export default ServerError;
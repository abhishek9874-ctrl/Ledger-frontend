import React, { useState } from "react";
import { Wifi, LoaderCircle } from "lucide-react";
import api from "../api/axios";
import { useServerStatus } from "../context/ServerStatusContext";

function ServerError() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { setServerError } = useServerStatus();

  const handleRetry = async () => {
    setLoading(true);
    setMessage("");

    try {
      await api.get("/health");
      setServerError(false);
    } catch (error) {
      setMessage(
        "The server is still starting. Please wait a little and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
          {loading ? (
            <LoaderCircle
              size={38}
              className="animate-spin text-blue-600"
            />
          ) : (
            <Wifi size={38} className="text-blue-600" />
          )}
        </div>

        <h1 className="mt-6 text-2xl font-bold text-gray-900">
          {loading ? "Waking up the server..." : "Server is waking up"}
        </h1>

        <p className="mx-auto mt-3 max-w-sm leading-relaxed text-gray-500">
          Our server may take up to 60 seconds to respond after a period
          of inactivity. Please wait a moment and try again.
        </p>

        {message && (
          <p role="status" className="mt-4 text-sm text-amber-700">
            {message}
          </p>
        )}

        <button
          onClick={handleRetry}
          disabled={loading}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading && <LoaderCircle size={18} className="animate-spin" />}
          {loading ? "Checking server..." : "Try Again"}
        </button>
      </div>
    </div>
  );
}

export default ServerError;
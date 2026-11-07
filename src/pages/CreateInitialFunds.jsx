
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import {
  ArrowLeftRight,
  UserRound,
  Wallet,
  FileText,
  Send,
  Info,
  ChevronDown,
  KeyRound,
  User,
  LoaderCircle,
} from "lucide-react";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import { v4 as uuidv4 } from "uuid";





function CreateInitialFunds() {
  const navigate = useNavigate();

  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [loadingAccounts, setLoadingAccounts] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await api.get("/account/all");


        const accountList = response.data.accounts || [];

        setAccounts(accountList);
      } catch (err) {
        console.error("Failed to fetch all accounts:", err);
        setError(
          err.response?.data?.message ||
          "Unable to load recipient accounts."
        );
      } finally {
        setLoadingAccounts(false);
      }
    };

    fetchAccounts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!selectedAccount) {
      setError("Please select a recipient account.");
      return;
    }

    const numericAmount = Number(amount);

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setError("Please enter a valid amount greater than zero.");
      return;
    }

    setSubmitting(true);

    try {
      const idempotencyKey = uuidv4();

      const response = await api.post("/transactions/system/initial-funds", {
        toAccount: selectedAccount,
        amount: numericAmount,
        idempotencyKey,
      });
      setSuccess(
        response.data.message || "Initial funds created successfully!"
      );

      setAmount("");
      setNote("");
      setSelectedAccount("");
    } catch (err) {
      console.error("Initial funds transfer failed:", err);
      setError(
        err.response?.data?.message ||
        "Unable to create initial funds. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <SideBar />

      <div className="min-w-0 flex-1 w-full">
        <Header />

        <main className="w-full min-w-0 p-3 sm:p-4 md:p-6 lg:p-8">
          <div className="w-full bg-slate-50 py-3 sm:py-5">
            <div className="mx-auto w-full max-w-6xl rounded-2xl sm:rounded-[28px] border border-slate-200 bg-white p-4 sm:p-6 lg:p-8 shadow-sm">
              {/* Header */}
              <div className="mb-6 sm:mb-10 flex flex-wrap items-center gap-3 sm:gap-5">

                <div className="flex h-12 w-12 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-blue-100 text-blue-600">
                  <ArrowLeftRight size={28} />
                </div>

                <div className="min-w-0 flex-1">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-950">
                    Create Initial Funds
                  </h1>

                  <p className="mt-1 text-sm sm:text-base text-slate-500">
                    Transfer virtual money to a user account
                  </p>
                </div>

                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-emerald-700">
                  ● System
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                {/* Recipient Account */}
                <div>
                  <label className="mb-3 block text-base sm:text-lg font-semibold text-slate-900">
                    To Account
                  </label>

                  <div className="relative">

                    {/* Selected Account */}
                    <button
                      type="button"
                      disabled={loadingAccounts || submitting}
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="flex w-full items-center gap-3 sm:gap-5 rounded-2xl border border-slate-200 bg-white p-3 sm:p-5 text-left hover:border-blue-400 transition"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                        <UserRound size={24} />
                      </div>

                      <div className="min-w-0 flex-1">
                        {selectedAccount ? (
                          <>
                            <p className="font-semibold text-slate-900 truncate">
                              {accounts.find(a => a._id === selectedAccount)?.user?.name ||
                                accounts.find(a => a._id === selectedAccount)?.name ||
                                "User"}
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                              ******{selectedAccount.slice(-6).toUpperCase()}
                            </p>
                          </>
                        ) : (
                          <p className="text-sm sm:text-base text-slate-600">
                            {loadingAccounts
                              ? "Loading accounts..."
                              : "Select recipient account"}
                          </p>
                        )}
                      </div>

                      <ChevronDown
                        size={22}
                        className={`shrink-0 text-slate-500 transition-transform ${dropdownOpen ? "rotate-180" : ""
                          }`}
                      />
                    </button>

                    {/* Dropdown Options */}
                    {dropdownOpen && (
                      <div className="absolute left-0 right-0 top-full z-30 mt-2 max-h-64 overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-xl">

                        {accounts.map((account) => (
                          <button
                            key={account._id}
                            type="button"
                            onClick={() => {
                              setSelectedAccount(account._id);
                              setDropdownOpen(false);
                            }}
                            className={`flex w-full flex-col items-start gap-1 px-4 py-4 text-left transition hover:bg-slate-100 ${selectedAccount === account._id
                                ? "bg-blue-50"
                                : "bg-white"
                              }`}
                          >
                            <span className="font-semibold text-slate-900">
                              {account.user?.name || account.name || "User"}
                            </span>

                            <span className="text-sm text-slate-500">
                              ******{account._id.slice(-6).toUpperCase()}
                            </span>
                          </button>
                        ))}

                        {accounts.length === 0 && !loadingAccounts && (
                          <p className="p-4 text-sm text-gray-500">
                            No accounts available.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Amount */}
                <div>
                  <label
                    htmlFor="amount"
                    className="mb-2 sm:mb-4 block text-base sm:text-lg font-semibold text-slate-900"
                  >
                    Amount
                  </label>

                  <div className="flex overflow-hidden rounded-2xl border border-slate-200 transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
                    <div className="flex items-center justify-center bg-slate-50 px-4 sm:px-6 text-2xl sm:text-3xl text-slate-700">
                      ₹
                    </div>

                    <input
                      id="amount"
                      type="number"
                      min="0.01"
                      step="0.01"
                      inputMode="decimal"
                      placeholder="Enter amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      disabled={submitting}
                      className="min-w-0 flex-1 w-full bg-white px-3 sm:px-5 py-4 sm:py-6 text-base sm:text-lg outline-none"
                    />

                    <div className="flex items-center px-2 sm:px-5 text-xs sm:text-sm text-slate-500 whitespace-nowrap">
                      {Number(amount || 0).toFixed(2)}
                    </div>
                  </div>

                  <p className="mt-3 text-slate-500">
                    Enter amount to transfer (Virtual funds)
                  </p>
                </div>

                {/* Optional note */}
                <div>
                  <label
                    htmlFor="note"
                    className="mb-2 sm:mb-4 block text-base sm:text-lg font-semibold text-slate-900"
                  >
                    Transfer Note (Optional)
                  </label>

                  <div className="flex overflow-hidden rounded-2xl border border-slate-200 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
                    <div className="flex items-center justify-center bg-slate-50 px-3 sm:px-6 text-slate-500">
                      <FileText size={22} />
                    </div>

                    <input
                      id="note"
                      type="text"
                      maxLength={100}
                      placeholder="Add a note (optional)"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      disabled={submitting}
                      className="min-w-0 flex-1 w-full bg-white px-3 sm:px-5 py-4 sm:py-6 text-sm sm:text-lg outline-none"
                    />

                    <div className="flex items-center px-2 sm:px-5 text-xs sm:text-sm text-slate-500 whitespace-nowrap">
                      {note.length}/100
                    </div>
                  </div>
                </div>

                {/* Feedback */}
                {error && (
                  <div
                    role="alert"
                    className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700"
                  >
                    {error}
                  </div>
                )}

                {success && (
                  <div
                    role="status"
                    className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-700"
                  >
                    {success}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting || loadingAccounts}
                  className="flex w-full items-center justify-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl bg-blue-600 px-4 sm:px-6 py-4 sm:py-5 text-base sm:text-lg font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <LoaderCircle className="animate-spin" size={27} />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Send size={28} />
                      Create Initial Funds
                    </>
                  )}
                </button>

                {/* Demo notice */}
                <div className="flex items-start gap-3 sm:gap-4 rounded-xl sm:rounded-2xl border border-blue-200 bg-blue-50 p-3 sm:p-5">
                  <Info className="mt-1 shrink-0 text-blue-600" size={22} />

                  <div className="min-w-0">
                    <h2 className="font-semibold text-blue-700">Demo Only</h2>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      This will credit virtual funds to the selected account. It is
                      intended for testing and demo purposes only and does not
                      represent a real-money transfer.
                    </p>
                  </div>
                </div>
              </form>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
              >
                <Wallet size={18} />
                Back
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default CreateInitialFunds;


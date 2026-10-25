
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeftRight,
  UserRound,
  Wallet,
  FileText,
  Send,
  Info,
  ChevronDown,
  KeyRound,
  LoaderCircle,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

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

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/account`, {
          withCredentials: true,
        });

        const data = response.data;
        const accountList = Array.isArray(data)
          ? data
          : data.accounts || data.account || [];

        setAccounts(accountList);
      } catch (err) {
        console.error("Failed to fetch accounts:", err);
        setError("Unable to load accounts. Please try again.");
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
      const idempotencyKey = crypto.randomUUID();

      const response = await axios.post(
        `${API_URL}/api/transactions/create-initial-fund`,
        {
          toAccount: selectedAccount,
          amount: numericAmount,
          idempotencyKey,
          note: note.trim(),
        },
        { withCredentials: true }
      );

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
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-8 lg:p-10">
        {/* Header */}
        <div className="mb-10 flex flex-wrap items-center gap-5">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
            <ArrowLeftRight size={42} strokeWidth={2} />
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Create Initial Funds
            </h1>
            <p className="mt-2 text-base text-slate-500 sm:text-lg">
              Transfer virtual money to a user account
            </p>
          </div>

          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
            ● System
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-9">
          {/* Recipient account */}
          <div>
            <label
              htmlFor="recipient"
              className="mb-4 block text-lg font-semibold text-slate-900"
            >
              To Account
            </label>

            <div className="relative">
              <div className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 rounded-xl bg-slate-100 p-3 text-slate-600">
                <UserRound size={26} />
              </div>

              <select
                id="recipient"
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
                disabled={loadingAccounts || submitting}
                className="w-full appearance-none rounded-2xl border border-slate-200 bg-white py-5 pl-24 pr-14 text-base text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-50 sm:text-lg"
              >
                <option value="">
                  {loadingAccounts
                    ? "Loading accounts..."
                    : "Select recipient account"}
                </option>

                {accounts.map((account) => (
                  <option key={account._id} value={account._id}>
                    {account.user?.name || account.name || "User"} —{" "}
                    {account.accountNumber || account._id}
                  </option>
                ))}
              </select>

              <ChevronDown
                className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-slate-500"
                size={24}
              />
            </div>
          </div>

          {/* Amount */}
          <div>
            <label
              htmlFor="amount"
              className="mb-4 block text-lg font-semibold text-slate-900"
            >
              Amount
            </label>

            <div className="flex overflow-hidden rounded-2xl border border-slate-200 transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
              <div className="flex items-center justify-center bg-slate-50 px-6 text-3xl text-slate-700">
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
                className="min-w-0 flex-1 bg-white px-5 py-6 text-lg outline-none"
              />

              <div className="flex items-center px-5 text-slate-500">
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
              className="mb-4 block text-lg font-semibold text-slate-900"
            >
              Transfer Note (Optional)
            </label>

            <div className="flex overflow-hidden rounded-2xl border border-slate-200 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
              <div className="flex items-center justify-center bg-slate-50 px-6 text-slate-500">
                <FileText size={27} />
              </div>

              <input
                id="note"
                type="text"
                maxLength={100}
                placeholder="Add a note (optional)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                disabled={submitting}
                className="min-w-0 flex-1 bg-white px-5 py-6 text-lg outline-none"
              />

              <div className="flex items-center px-5 text-slate-500">
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
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 px-6 py-6 text-lg font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60 sm:text-xl"
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
          <div className="flex gap-4 rounded-2xl border border-blue-200 bg-blue-50 p-5">
            <Info className="mt-1 shrink-0 text-blue-600" size={30} />

            <div>
              <h2 className="font-semibold text-blue-700">Demo Only</h2>
              <p className="mt-1 text-sm leading-6 text-slate-600 sm:text-base">
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
  );
}

export default CreateInitialFunds;


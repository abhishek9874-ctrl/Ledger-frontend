import React from "react";
import {
  Landmark,
  Bell,
  ChevronDown,
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  FileBarChart,
  User,
  LogOut,
  TrendingUp,
  TrendingDown,
  PieChart,
  UserPlus,
  ListChecks,
  Mail,
  ShieldCheck,
  KeyRound,
  Lock,
  Cookie,
  FileLock2,
  ScrollText,
  Users,
  Eye,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Link } from "react-router-dom";

const balanceData = [
  { month: "Jan", value: 11000 },
  { month: "Feb", value: 15500 },
  { month: "Mar", value: 13000 },
  { month: "Apr", value: 18000 },
  { month: "May", value: 16500 },
  { month: "Jun", value: 24560 },
];

const steps = [
  {
    n: "01",
    icon: UserPlus,
    title: "Create Account",
    desc: "Sign up securely with your email or Google account.",
    bg: "bg-blue-50",
    fg: "text-blue-600",
  },
  {
    n: "02",
    icon: Wallet,
    title: "Add Accounts",
    desc: "Create and manage multiple accounts like Savings, Current, Cash and more.",
    bg: "bg-emerald-50",
    fg: "text-emerald-600",
  },
  {
    n: "03",
    icon: ArrowLeftRight,
    title: "Transfer & Track",
    desc: "Transfer money between accounts and keep track of every transaction.",
    bg: "bg-violet-50",
    fg: "text-violet-600",
  },
  {
    n: "04",
    icon: TrendingUp,
    title: "Manage Your Accounts",
  desc: "Create and organize multiple accounts, and keep track of their balances in one place.",
    bg: "bg-orange-50",
    fg: "text-orange-600",
  },
];

const features = [
  {
    icon: Wallet,
    title: "Account Management",
    desc: "Create and manage multiple accounts such as Savings, Current, or other account types in one place.",
    bg: "bg-blue-50",
    fg: "text-blue-600",
  },
  {
    icon: ArrowLeftRight,
    title: "Money Transfers",
    desc: "Transfer money between accounts securely while maintaining a complete transaction record.",
    bg: "bg-emerald-50",
    fg: "text-emerald-600",
  },
  {
    icon: ListChecks,
    title: "Transaction Tracking",
    desc: "View money sent and received with details like amount, account, status, and timestamp.",
    bg: "bg-violet-50",
    fg: "text-violet-600",
  },
  {
    icon: Mail,
    title: "Email Notifications",
    desc: "Get email alerts for every successful transaction and important account actions.",
    bg: "bg-orange-50",
    fg: "text-orange-600",
  },
];

const security = [
  { icon: Users, title: "JWT Authentication", desc: "Secure login and protected sessions" },
  { icon: KeyRound, title: "Encrypted Passwords", desc: "Passwords are hashed and never stored in plain text" },
  { icon: Cookie, title: "Secure Cookies", desc: "HTTP-only cookies for extra protection" },
  { icon: FileLock2, title: "Protected Routes", desc: "Only authenticated users can access your data" },
  { icon: ScrollText, title: "Transaction Ledger", desc: "Every transaction is stored securely in the ledger" },
];

const whyUs = [
  {
    icon: Users,
    title: "All in One Place",
    desc: "Manage all your accounts and transactions from a single, powerful dashboard.",
    bg: "bg-blue-50",
    fg: "text-blue-600",
  },
  {
    icon: Eye,
    title: "Clear Visibility",
    desc: "Know where your money is coming from and where it is going.",
    bg: "bg-emerald-50",
    fg: "text-emerald-600",
  },
  {
    icon: BadgeCheck,
    title: "Reliable Records",
    desc: "Every transaction is recorded in a secure ledger you can trust and rely on.",
    bg: "bg-violet-50",
    fg: "text-violet-600",
  },
];

const recentTransactions = [
  { title: "Salary", sub: "Received", amount: "+₹14,000.00", date: "Today", positive: true, icon: TrendingUp },
  { title: "Amazon Purchase", sub: "Shopping", amount: "-₹1,240.00", date: "Yesterday", positive: false, icon: TrendingDown },
  { title: "Transfer to Savings", sub: "Transfer", amount: "-₹5,000.00", date: "2 May 2024", positive: false, icon: ArrowLeftRight },
  { title: "Freelance Work", sub: "Received", amount: "+₹3,500.00", date: "1 May 2024", positive: true, icon: TrendingUp },
];

function Logo({ light = false }) {
  return (
    <div className="flex items-center gap-2 font-bold text-lg">
      <Landmark className="text-blue-600" />
                  <h1 className="text-2xl font-bold text-blue-600">
                    LEDGERLY
                  </h1>
    </div>
  );
}

function NavBar() {
  const links = ["Features", "How It Works", "Security", "Pricing", "FAQ", "Contact"];
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-slate-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Logo />
        
        <div className="flex items-center gap-3">
          <Link to={"/login"}>
          <button className="hidden sm:inline-flex px-4 py-2 text-sm font-semibold text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
            Log in
          </button>
          </Link>
          <Link to={"/register"}>
          <button className="inline-flex px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
            Get Started
          </button>
          </Link>
        </div>
      </div>
    </header>
  );
}

function StatCard({ label, value, icon: Icon, tone }) {
  const tones = {
    slate: "bg-slate-100 text-slate-600",
    red: "bg-red-50 text-red-500",
    green: "bg-emerald-50 text-emerald-600",
    orange: "bg-orange-50 text-orange-500",
  };
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-slate-500">{label}</p>
          <p className="mt-2 text-base font-bold text-slate-900">{value}</p>
        </div>
        <span className={`grid place-items-center w-8 h-8 rounded-lg ${tones[tone]}`}>
          <Icon size={16} />
        </span>
      </div>
    </div>
  );
}

function DashboardMock() {
  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: Wallet, label: "Accounts" },
    { icon: ArrowLeftRight, label: "Transactions" },
    { icon: ArrowLeftRight, label: "Transfer Money" },
    { icon: User, label: "Profile" }
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <Logo />
        <div className="flex items-center gap-4">
          <Bell size={18} className="text-slate-400" />
          <div className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
            <span className="grid place-items-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold">
              A
            </span>
            Andrew
            <ChevronDown size={14} className="text-slate-400" />
          </div>
        </div>
      </div>

      <div className="flex">
        <aside className="hidden sm:block w-40 border-r border-slate-100 py-4 px-2 shrink-0">
          <ul className="space-y-1">
            {navItems.map(({ icon: Icon, label, active }) => (
              <li key={label}>
                <a
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-colors text-slate-400`}
                >
                  <Icon size={15} />
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <a  className="flex items-center gap-2 rounded-lg px-3 py-2 mt-6 text-xs font-medium text-slate-400 ">
            <LogOut size={15} />
            Logout
          </a>
        </aside>

        <div className="flex-1 p-4 space-y-4 min-w-0">
          <div className="grid grid-cols-2 gap-3">
            <StatCard label="Total Balance" value="₹24,560.00" icon={Wallet} tone="slate" />
            <StatCard label="Money Sent" value="₹8,420.00" icon={TrendingUp} tone="red" />
            <StatCard label="Money Received" value="₹14,850.00" icon={TrendingDown} tone="green" />
            <StatCard label="Monthly Expense" value="₹6,320.00" icon={PieChart} tone="orange" />
          </div>

          <div className="rounded-xl border border-slate-100 p-4">
            <p className="text-sm font-semibold text-slate-800 mb-2">Balance Overview</p>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={balanceData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="balanceFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563eb" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v / 1000}K`} />
                  <Tooltip formatter={(v) => [`₹${v.toLocaleString()}`, "Balance"]} />
                  <Area type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} fill="url(#balanceFill)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-xl border border-slate-100 p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-slate-800">Recent Transactions</p>
              <a href="#" className="text-xs font-semibold text-blue-600">View All</a>
            </div>
            <ul className="space-y-3">
              {recentTransactions.map((t) => (
                <li key={t.title} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`grid place-items-center w-8 h-8 rounded-lg ${t.positive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}>
                      <t.icon size={14} />
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-slate-800">{t.title}</p>
                      <p className="text-[11px] text-slate-400">{t.sub}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs font-bold ${t.positive ? "text-emerald-600" : "text-red-500"}`}>{t.amount}</p>
                    <p className="text-[11px] text-slate-400">{t.date}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold mb-5">
          LEARN MORE ABOUT LEDGERLY
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
          A smarter way to <span className="text-blue-600">manage your money</span>
        </h1>
        <p className="mt-5 text-slate-500 text-lg leading-relaxed max-w-lg">
          LEDGERLY is a secure and intelligent platform that helps you manage
          multiple accounts, transfer money, track transactions, and understand your
          spending from one place.
        </p>

        <div className="mt-8 space-y-5">
          {[
            { icon: ShieldCheck, title: "Secure & Private", desc: "Your data is encrypted and protected", bg: "bg-blue-50", fg: "text-blue-600" },
            { icon: TrendingUp, title: "Fast & Reliable", desc: "Reliable Transfers and Transfer money between accounts and review transaction records", bg: "bg-emerald-50", fg: "text-emerald-600" },
            { icon: FileBarChart, title: "Clear Visibility", desc: "Track your accounts, balances, and transactions in one place.", bg: "bg-violet-50", fg: "text-violet-600" },
          ].map(({ icon: Icon, title, desc, bg, fg }) => (
            <div key={title} className="flex items-center gap-4">
              <span className={`grid place-items-center w-11 h-11 rounded-xl ${bg} ${fg} shrink-0`}>
                <Icon size={20} />
              </span>
              <div>
                <p className="font-semibold text-slate-900 text-sm">{title}</p>
                <p className="text-slate-500 text-sm">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <DashboardMock />
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-extrabold text-slate-900 text-center">How LEDGERLY Works</h2>
        <p className="text-slate-500 text-center mt-2">Manage your finances in four simple steps</p>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {steps.map(({ n, icon: Icon, title, desc, bg, fg }, i) => (
            <div key={n} className="relative text-center px-2">
              {i < steps.length - 1 && (
                <ArrowRight size={18} className="hidden lg:block absolute top-8 -right-3 text-slate-300" />
              )}
              <div className={`mx-auto w-16 h-16 rounded-full ${bg} ${fg} grid place-items-center relative`}>
                <Icon size={26} />
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[11px] font-bold text-slate-400 bg-slate-50 px-1">
                  {n}
                </span>
              </div>
              <h3 className="mt-5 font-bold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CoreFeatures() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-extrabold text-slate-900 text-center">Core Features</h2>
        <p className="text-slate-500 text-center mt-2">Everything you need to manage your money efficiently</p>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map(({ icon: Icon, title, desc, bg, fg }) => (
            <div key={title} className="rounded-2xl border border-slate-100 p-6 hover:shadow-md transition-shadow">
              <span className={`grid place-items-center w-11 h-11 rounded-xl ${bg} ${fg}`}>
                <Icon size={20} />
              </span>
              <h3 className="mt-5 font-bold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl bg-slate-50 border border-slate-100 p-10 grid lg:grid-cols-[auto_1fr] gap-8 items-center">
          <div className="mx-auto lg:mx-0 w-24 h-24 rounded-2xl bg-blue-600 grid place-items-center shadow-lg shadow-blue-200">
            <ShieldCheck size={44} className="text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Your Security is Our Priority</h3>
            <p className="text-slate-500 mt-1">We use industry-standard practices to keep your data and money safe.</p>

            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {security.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-2">
                  <Icon size={16} className="text-blue-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{title}</p>
                    <p className="text-xs text-slate-500 mt-0.5 leading-snug">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-extrabold text-slate-900 text-center">Why LEDGERLY?</h2>
        <div className="mt-12 grid sm:grid-cols-3 gap-10">
          {whyUs.map(({ icon: Icon, title, desc, bg, fg }) => (
            <div key={title} className="flex flex-col sm:items-start items-center text-center sm:text-left">
              <span className={`grid place-items-center w-12 h-12 rounded-full ${bg} ${fg}`}>
                <Icon size={20} />
              </span>
              <h3 className="mt-4 font-bold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed max-w-xs">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="px-6 pb-16">
      <div className="max-w-7xl mx-auto rounded-2xl bg-blue-600 px-8 sm:px-12 py-10 flex flex-col lg:flex-row items-center gap-8">
        <span className="grid place-items-center w-16 h-16 rounded-2xl bg-white/10 shrink-0">
          <Landmark size={30} className="text-white" />
        </span>
        <div className="flex-1 text-center lg:text-left">
          <h3 className="text-white text-xl sm:text-2xl font-extrabold">Ready to take control of your finances?</h3>
          <p className="text-blue-100 mt-2 max-w-xl">
            Ready to manage your money smarter?

Bring your accounts and transactions together with LEDGERLY.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <Link to={"/register"}><button className="px-5 py-2.5 rounded-lg bg-white text-blue-600 font-semibold text-sm hover:bg-blue-50 transition-colors">
            Create Account
          </button></Link>
          <Link to={"/login"}><button className="px-5 py-2.5 rounded-lg border border-white/40 text-white font-semibold text-sm hover:bg-white/10 transition-colors">
            Log in
          </button></Link>
        </div>
      </div>
    </section>
  );
}

export default function LearnMore() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <NavBar />
      <Hero />
      <HowItWorks />
      <CoreFeatures />
      <WhyUs />
      <CTA />
    </div>
  );
}
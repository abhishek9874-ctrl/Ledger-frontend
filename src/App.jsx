import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import CreateAccount from './pages/CreateAccount'
import Dashboard from './pages/Dashboard'
import Accounts from './pages/Accounts'
import ViewDetails from './pages/ViewDetails'
import Transactions from './pages/Transactions'
import Transfer from './pages/Transfer'
import Profile from './pages/Profile'
import ProtectedRoute from './components/ProtectedRoute'
import About from './pages/About'
import { useServerStatus } from "./context/ServerStatusContext";
import ServerError from "./components/ServerError";
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import LearnMore from './pages/LearnMore'
import CreateInitialFunds from './pages/CreateInitialFunds'

const user = JSON.parse(localStorage.getItem("user") || "null");



function App() {
  const { serverError } = useServerStatus();

  if (serverError) {
    return <ServerError />;
  }

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/createAccount' element={<CreateAccount />} />
      <Route path='/dashboard' element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
      />
      <Route path='/accounts' element={
        <ProtectedRoute>
          <Accounts />
        </ProtectedRoute>
      } />
      <Route
        path="/viewdetails/:accountId"
        element={
          <ProtectedRoute>
            <ViewDetails />
          </ProtectedRoute>
        }
      />
      <Route path='/transactions' element={
        <ProtectedRoute><Transactions /> </ProtectedRoute>} />
      <Route
        path="/transfer"
        element={
          <ProtectedRoute>
            
            {user.systemUser===false?(
              <Transfer />
            ):(
              <Navigate to="/dashboard" replace/>
            )}
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create-initial-fund"
        element={
          <ProtectedRoute>
            {user?.systemUser === true ? (
              <CreateInitialFunds />
            ) : (
              <Navigate to="/dashboard" replace />
            )}
          </ProtectedRoute>
        }
      />

      <Route path='/about' element={<About />} />
      <Route path='/forgotPassword' element={<ForgotPassword />} />
      <Route path='/reset-password/:token' element={<ResetPassword />} />
      <Route path='/learn-more' element={<LearnMore />} />
    </Routes>
  )
}

export default App

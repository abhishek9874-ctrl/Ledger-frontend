import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import CreateAccount from './pages/CreateAccount'
import Dashboard from './pages/Dashboard'
import Accounts from './pages/Accounts'
import ViewDetails from './pages/ViewDetails'
import Transactions from './pages/Transactions'
import Transfer from './pages/Transfer'



function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route  path='/' element={<Home/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/createAccount' element={<CreateAccount/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/accounts' element={<Accounts/>}/>
      <Route path='/viewdetails/:accountId' element={<ViewDetails/>}/>
      <Route path='/transactions'  element={<Transactions/>}/>
      <Route path='/transfer' element={<Transfer/>}/>
    </Routes>
  )
}

export default App

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ServerStatusProvider } from './context/ServerStatusContext';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ServerStatusProvider>
      <App />
    </ServerStatusProvider>
  </BrowserRouter>,
)

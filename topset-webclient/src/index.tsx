import './index.css'
import config from './config/config.json'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Login from './pages/Login'
import Home from './pages/Home'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/login',
    element: <Login googleLoginRedirect={config.googleLoginRedirect} />
  },
  {
    path: '/home',
    element: <Home />
  }
])

createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />
)
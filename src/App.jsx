import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Signup from './components/Signup'
import Login from "./components/Login"
import Home from "./components/Home"
import HistoryPage from './components/HistoryPage'
import ProfilePage from './components/Profile'
import MonthlySummaryCard from './components/MonthlySummaryCard'
import AdminLogin from './admin/AdminLogin'
import AdminDashboard from './admin/AdminDashboard'
import VerifyUser from './components/verifyUser'
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const token = localStorage.getItem("jwt");
  return (
    <div>
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/admin/login' element={<AdminLogin/>}/>
        <Route path='/' element={token ? <Home/> : <Navigate to="/login" />} />
        <Route path='/admin' element={<AdminDashboard/>}/>
        <Route path='/history' element={<HistoryPage/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='/dashboard' element={<MonthlySummaryCard/>}/>
        <Route path='/verify-user' element={<VerifyUser/>}/>
        <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
      </Routes>
      <Toaster />
    </div>
  )
}

export default App

import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Signup1 from './components/Signup';
import Login from "./components/Login";
import Home from "./components/Home";
import HistoryPage from './components/HistoryPage';
import ProfilePage from './components/Profile';
import MonthlySummaryCard from './components/MonthlySummaryCard';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import EkadashiLiveScore from './components/EkadashiLiveScore';
import VerifyUser from './components/verifyUser';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import toast, { Toaster } from 'react-hot-toast';
import { isTokenExpired } from "./utils/tokenUtils";

function App() {
  const navigate = useNavigate();
  const [validToken, setValidToken] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token || isTokenExpired(token)) {
      localStorage.removeItem("jwt");
      toast.error("Session expired. Please login again.");
      setValidToken(false);
      navigate("/login");
    } else {
      setValidToken(true);
    }
  }, []);

  return (
    <div>
      <Routes>
        <Route path='/signup' element={<Signup1 />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/' element={validToken ? <Home /> : <Navigate to="/login" />} />
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/history' element={<HistoryPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/ekadashi-live' element={<EkadashiLiveScore />} />
        <Route path='/dashboard' element={<MonthlySummaryCard />} />
        <Route path='/verify-user' element={<VerifyUser />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password/:token' element={<ResetPassword />} />
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;

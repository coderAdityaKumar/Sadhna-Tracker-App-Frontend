import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { APP_VERSION } from './config';
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

function App() {
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    const storedVersion = localStorage.getItem("appVersion");
    if (storedVersion !== APP_VERSION) {
      setShowUpdatePopup(true);
    }
  }, []);

  const handleUpdateConfirm = () => {
    localStorage.removeItem("jwt");
    localStorage.setItem("appVersion", APP_VERSION);
    navigate("/login");
  };

  return (
    <>
      <Routes>
        <Route path='/signup' element={<Signup1 />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/' element={token ? <Home /> : <Navigate to="/login" />} />
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

      {/* Version Update Popup */}
      {showUpdatePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h2 className="text-xl font-semibold text-red-600 mb-2">Update Notice</h2>
            <p className="text-gray-700 mb-4">
              We've updated the website with new features. Please login again.
            </p>
            <button
              onClick={handleUpdateConfirm}
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
            >
              Login Again
            </button>
          </div>
        </div>
      )}

      <Toaster />
    </>
  );
}

export default App;

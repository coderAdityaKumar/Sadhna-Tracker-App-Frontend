import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';
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

// Define your current app version here
const APP_VERSION = '1.0.0'; // update this string each time you deploy

function App() {
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    const storedVersion = localStorage.getItem("appVersion");

    // Show popup if version changed and user is NOT on login or signup pages
    if (
      storedVersion !== APP_VERSION &&
      location.pathname !== "/login" &&
      location.pathname !== "/signup"
    ) {
      setShowUpdatePopup(true);
    }
  }, [location.pathname]);

  const handleUpdateConfirm = () => {
    localStorage.removeItem("jwt");           // clear token so user has to login again
    localStorage.setItem("appVersion", APP_VERSION); // update stored version
    setShowUpdatePopup(false);
    navigate("/login");                        // redirect to login
    toast.success("Please login again to continue.");
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

      {/* Update Popup Modal */}
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

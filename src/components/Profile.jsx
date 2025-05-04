import React, { useState, useEffect } from "react";
import DeleteProfile from "./DeleteProfile";
import EditProfile from "./EditProfile";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiEdit,
  FiTrash2,
  FiMail,
  FiHome,
  FiUser,
  FiArrowLeft,
  FiAward,
  FiX,
  FiBook
} from "react-icons/fi";
import { FaHorseHead } from "react-icons/fa";

const ProfilePage = () => {
  const baseURL = import.meta.env.VITE_BACKEND_URL;
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showDeleteProfile, setShowDeleteProfile] = useState(false);
  const [chantingRounds, setChantingRounds] = useState(0);
  const [totalSpiritualBookMinutes, setTotalSpiritualBookMinutes] = useState(0);
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    hostel: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseURL}/user/get-user`, {
          withCredentials: true,
          headers: {
            Authorization: `${localStorage.getItem("jwt")}`,
            "Content-Type": "application/json",
          },
        });

        const { data } = response;
        console.log(data);
        setUserData({
          firstname: data.data.firstName,
          lastname: data.data.lastName,
          email: data.data.email,
          hostel: data.data.hostel,
          avatar: data.data.avatar || "",
        });
        const rounds = data.data.sadhna.reduce(
          (total, entry) => total + (entry.chantingRounds || 0),
          0
        );
        setChantingRounds(rounds);
        // console.log(chantingRounds)
        const bookMinutes = data.data.sadhna.reduce(
          (total, entry) => total + (entry.bookReading.duration || 0),
          0
        );
        setTotalSpiritualBookMinutes(bookMinutes);
        // console.log(bookMinutes)
        setError(null);
      } catch (error) {
        setError("Failed to fetch user data");
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const generateAvatar = (name) => {
    if (userData.avatar) return userData.avatar;

    const colors = [
      "bg-purple-500",
      "bg-indigo-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-red-500",
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

    return (
      <div
        className={`${randomColor} w-32 h-32 rounded-full flex items-center justify-center text-white text-4xl font-bold`}
      >
        {initials}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <motion.div
          className="p-8 bg-white rounded-3xl shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col items-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full"
            />
            <motion.p
              className="mt-6 text-gray-600 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Loading your spiritual journey...
            </motion.p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <motion.div
          className="p-8 bg-white rounded-3xl shadow-lg text-center max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Connection Error
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <motion.button
            className="bg-purple-600 text-white px-6 py-2 rounded-full font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
          >
            Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        

        {/* Profile Card */}
        <motion.div
          className="bg-white rounded-3xl shadow-xl overflow-hidden"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 sm:p-8 text-center">
            <motion.div
              className="mx-auto -mt-16"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {generateAvatar(`${userData.firstname} ${userData.lastname}`)}
            </motion.div>

            <motion.h1
              className="text-2xl sm:text-3xl font-bold text-white mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {userData.firstname} {userData.lastname}
            </motion.h1>

            <motion.div
              className="flex justify-center space-x-4 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm flex items-center">
                Devotee
              </span>
            </motion.div>
          </div>

          {/* Profile Details */}
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Info */}
              <motion.div
                className="bg-purple-50 rounded-xl p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="text-lg font-semibold text-purple-800 mb-4 flex items-center">
                  <FiUser className="mr-2" /> Personal Information
                </h3>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-purple-600">Full Name</p>
                    <p className="font-medium">
                      {userData.firstname} {userData.lastname}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-purple-600">Email</p>
                    <p className="font-medium flex items-center">
                      <FiMail className="mr-2 text-purple-500" />{" "}
                      {userData.email}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-purple-600">Hostel</p>
                    <p className="font-medium flex items-center">
                      <FiHome className="mr-2 text-purple-500" />{" "}
                      {userData.hostel || "Not specified"}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Spiritual Stats */}
              <motion.div
                className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 shadow-lg border border-blue-200 overflow-hidden relative"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
              >
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-200 rounded-full opacity-20"></div>
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-300 rounded-full opacity-10"></div>

                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-blue-900 mb-6 flex items-center">
                    <motion.span
                      className="bg-blue-100 p-2 rounded-lg mr-3 shadow-inner"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <FiAward className="text-blue-600 text-xl" />
                    </motion.span>
                    Spiritual Progress
                  </h3>

                  <div className="space-y-5">
                    {/* Japa Rounds */}
                    <motion.div
                      className="bg-white p-4 rounded-xl shadow-sm border border-blue-100"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-blue-800 font-medium">
                          Total Japa Rounds
                        </span>
                        <span className="bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full text-sm">
                          {chantingRounds}
                        </span>
                      </div>
                      
                    </motion.div>

                    {/* Book Reading */}
                    <motion.div
                      className="bg-white p-4 rounded-xl shadow-sm border border-blue-100"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-blue-800 font-medium">
                          Spiritual Book Reading
                        </span>
                        <span className="bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full text-sm">
                          {totalSpiritualBookMinutes} mins
                        </span>
                      </div>
                      
                    </motion.div>
                  </div>

                  {/* Inspirational quote */}
                  <motion.p
                    className="mt-6 text-center text-blue-500 italic text-xs"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    "Small daily improvements lead to stunning results"
                  </motion.p>
                </div>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <motion.button
                className="flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-md"
                onClick={() => setShowEditProfile(true)}
                whileHover={{
                  y: -2,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <FiEdit className="mr-2" /> Edit Profile
              </motion.button>

              <motion.button
                className="flex items-center justify-center bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium transition-colors shadow-md"
                onClick={() => setShowDeleteProfile(true)}
                whileHover={{
                  y: -2,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <FiTrash2 className="mr-2 text-red-500" /> Delete Account
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {showEditProfile && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
                <h3 className="text-xl font-bold text-purple-800">
                  Edit Profile
                </h3>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setShowEditProfile(false)}
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6">
                <EditProfile
                  name={userData.firstname}
                  email={userData.email}
                  hostel={userData.hostel}
                  onClose={() => setShowEditProfile(false)}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Profile Modal */}
      <AnimatePresence>
        {showDeleteProfile && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
                <h3 className="text-xl font-bold text-red-600">
                  Delete Account
                </h3>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setShowDeleteProfile(false)}
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6">
                <DeleteProfile onClose={() => setShowDeleteProfile(false)} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfilePage;

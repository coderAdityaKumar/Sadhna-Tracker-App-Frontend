import React, { useState, useEffect } from "react";
import DeleteProfile from "./DeleteProfile";
import EditProfile from "./EditProfile";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const ProfilePage = () => {
  const baseURL=import.meta.env.VITE_BACKEND_URL
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showDeleteProfile, setShowDeleteProfile] = useState(false);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [hostel, setHostel] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${baseURL}/user/get-user`,
          {
            withCredentials: true,
            headers: {
              "Authorization": `${localStorage.getItem("jwt")}`,
              "Content-Type": "application/json"
            },
          }
        );
        console.log(response);
        const data = response.data;
        setFirstName(data.data.firstName);
        setLastName(data.data.lastName);
        setEmail(data.data.email);
        setHostel(data.data.hostel);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <motion.div
          className="p-6 bg-white rounded-2xl shadow-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-center">Loading profile...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <motion.div
          className="p-6 bg-white rounded-2xl shadow-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-red-500 text-center">{error}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <motion.div
        className="w-full max-w-xl mx-auto p-8 bg-gradient-to-br from-purple-100 to-yellow-50 rounded-3xl shadow-2xl border border-purple-200 min-h-[500px] flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >

        <motion.h2
          className="text-2xl font-bold mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {firstname || "First Name"} {lastname || "Last Name"}
        </motion.h2>
        <motion.p
          className="text-gray-600 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          🏡 {hostel || "Hostel name"}
        </motion.p>
        <motion.p
          className="text-gray-500 text-sm mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          📧 {email || "email@example.com"}
        </motion.p>

        <motion.button
          className="mt-3 bg-green-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700 transition"
          onClick={() => setShowEditProfile(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ✏️ Edit Profile
        </motion.button>

        <motion.button
          className="mt-3 bg-red-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-600 transition"
          onClick={() => setShowDeleteProfile(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🗑️ Delete Profile
        </motion.button>

        <AnimatePresence>
          {showEditProfile && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white max-w-2xl w-full p-8 rounded-xl relative overflow-auto max-h-[90vh]"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  className="absolute top-2 right-2 text-red-600 font-bold text-xl"
                  onClick={() => setShowEditProfile(false)}
                >
                  ✖
                </button>
                <EditProfile
                  name={firstname}
                  email={email}
                  hostel={hostel}
                  onClose={() => setShowEditProfile(false)}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showDeleteProfile && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white max-w-md w-full p-8 rounded-xl relative overflow-auto max-h-[90vh]"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  className="absolute top-2 right-2 text-red-600 font-bold text-xl"
                  onClick={() => setShowDeleteProfile(false)}
                >
                  ✖
                </button>
                <DeleteProfile />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ProfilePage;

// Import necessary components
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SadhanaForm from "../components/SadhanaForm";
import MonthlySummaryCard from "./MonthlySummaryCard";
import StreakCard from "./StreakCard";
import DailyGoals from "./DailyGoals";
import { motion, AnimatePresence } from "framer-motion";

export default function HomePage() {


const baseURL= import.meta.env.BACKEND_URL
  const navigate = useNavigate();

  const [showSadhanaForm, setShowSadhanaForm] = useState(false);
  const [showDailyGoals, setShowDailyGoals] = useState(false);
  const [firstname, setFirstName] = useState("");
  const [role, setRole] = useState("");
  const [sadhna, setSadhna] = useState([]);
  const [dailyGoal, setDailyGoal] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/user/get-user`,
          {
            withCredentials: true,
            headers: {
              Authorization: `${localStorage.getItem("jwt")}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = response.data;
        setFirstName(data.data.firstName);
        setSadhna(data.data.sadhna);
        setRole(data.data.role);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Fetch user data
    fetchUserData();

    // Check if daily goals are filled
    const checkDailyGoals = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/sadhna/check-daily-goals`,
          {
            withCredentials: true,
            headers: {
              Authorization: `${localStorage.getItem("jwt")}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        if (response.data.data.filled) {
          setShowDailyGoals(false);
          setDailyGoal(response.data.data.goal)
        } else {
          console.log("Plese fill the goals");
          setShowDailyGoals(true);
        }
      } catch (error) {
        console.error("Error checking daily goals:", error);
        setIsDailyGoalsFilled(false);
      }
    };

    checkDailyGoals();
  }, []);

  const handleLogout = () => {
    // 1. Remove the token from localStorage
    localStorage.removeItem("jwt");

    toast.success("Logged out successfully!");

    navigate("/login");
  };

  return (
    <div className="min-h-screen font-[Quintessential] bg-gradient-to-br from-amber-50 to-yellow-100 text-purple-900 overflow-x-hidden">
      {/* Navigation Bar */}
      <motion.nav
        className="flex flex-wrap justify-center md:justify-end items-center gap-3 w-full bg-gradient-to-r from-purple-200 via-purple-100 to-pink-100 px-4 md:px-20 py-3 shadow-md sticky top-0 z-50"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <a href="/history">
          <motion.button
            whileHover={{ scale: 1.02 }}
            className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition duration-300 text-sm md:text-base shadow"
          >
            📜 View History
          </motion.button>
        </a>

        <a href="/profile">
          <motion.button
            whileHover={{ scale: 1.02 }}
            className="px-4 py-2 bg-yellow-600 text-white rounded-full hover:bg-yellow-700 transition duration-300 text-sm md:text-base shadow"
          >
            ⚙️ Profile
          </motion.button>
        </a>

        <motion.button
          whileHover={{ scale: 1.02 }}
          className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300 text-sm md:text-base shadow"
          onClick={handleLogout}
        >
          🚪 Logout
        </motion.button>
      </motion.nav>

      {/* Hero Section */}
      <motion.div
        className="w-full text-center py-12 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold drop-shadow-md"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          Hare Krishna, {firstname}
        </motion.h1>

        <motion.div
          className="mt-4 text-xl md:text-2xl italic animate-pulse"
          initial={{ x: -200 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 50 }}
        >
          || Hare Krishna, Hare Krishna, Krishna Krishna, Hare Hare || || Hare
          Rama, Hare Rama, Rama Rama, Hare Hare ||
        </motion.div>

        <div className="flex flex-col justify-center items-center">
          <motion.button
            className="mt-6 px-6 py-3 bg-purple-700 text-white rounded-full hover:bg-purple-800 transition-all shadow-lg"
            onClick={() => setShowSadhanaForm(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            📆 Fill Today’s Sadhana
          </motion.button>

          {role === "admin" && (
            <a href="/admin/dashboard">
              <motion.button
                className="mt-6 px-6 py-3 bg-purple-700 text-white rounded-full hover:bg-purple-800 transition-all shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🛡️ Admin Dashboard
              </motion.button>
            </a>
          )}
        </div>

        <AnimatePresence>
          {showSadhanaForm && (
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
              >
                <button
                  className="absolute top-2 right-2 text-red-600 font-bold text-xl"
                  onClick={() => setShowSadhanaForm(false)}
                >
                  ✖
                </button>
                <SadhanaForm onClose={() => setShowSadhanaForm(false)} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <MonthlySummaryCard />
      </motion.div>

      {/* Goals Section */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-20 py-10"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div className="bg-purple-100 shadow-xl p-6 rounded-xl border-l-4 border-purple-500">
          <h2 className="text-xl font-semibold mb-2">🪔 Daily Dedication</h2>
          <ul className="list-disc list-inside font-mono">
            <li>📿 {dailyGoal?.roundsOfChanting ?? 0} rounds of chanting</li>
            <li>
              🌅 Attend Mangala Aarti{" "}
              {dailyGoal?.attendMangalaAarti ? "daily" : "❌ Not committed"}
            </li>
            <li>
              🎧 Watch {dailyGoal?.watchLectureMinutes ?? 0} mins of lecture
            </li>
            <li>
              📖 Read Srila Prabhupada’s books for{" "}
              {dailyGoal?.readBookMinutes ?? 0} mins
            </li>
          </ul>
          <div className="flex justify-end"></div>
          <AnimatePresence>
            {showDailyGoals && (
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
                >
                  <DailyGoals onClose={() => setShowDailyGoals(false)} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="bg-yellow-100 shadow-xl p-6 rounded-xl border-l-4 border-yellow-400"
          whileHover={{ scale: 1.02 }}
        >
          <StreakCard sadhna={sadhna} />
        </motion.div>

        <motion.div
          className="bg-purple-50 shadow-lg p-6 rounded-xl"
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-xl font-semibold mb-2">📖 Divine Quote</h2>
          <p className="italic font-mono">
            "Any devotee who believes that the holy name of the lord is
            identical with the lord is a pure devotee, even though he may be in
            the neophyte stage. By his association, others may also become
            vaisnavas"
          </p>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <div className="text-center pb-10">
        <div className="flex flex-wrap justify-center gap-4">
          {/* Future Actions */}
        </div>
      </div>
    </div>
  );
}

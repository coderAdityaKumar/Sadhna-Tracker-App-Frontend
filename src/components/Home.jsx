import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import SadhanaForm from "../components/SadhanaForm";
import MonthlySummaryCard from "./MonthlySummaryCard";
import StreakCard from "./StreakCard";
import DailyGoals from "./DailyGoals";
import {
  FiSun,
  FiMoon,
  FiCheckCircle,
  FiCircle,
  FiAward,
  FiBook,
  FiClock,
  FiUser,
  FiLogOut,
  FiCalendar,
  FiList,
} from "react-icons/fi";
import { MdAdminPanelSettings } from "react-icons/md";

const HomePage = () => {
  const baseURL = import.meta.env.VITE_BACKEND_URL;

  const [showSadhnaForm, setShowSadhanaForm] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [streak, setStreak] = useState(7);
  const [darkMode, setDarkMode] = useState(false);
  const [dailyGoal, setDailyGoal] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [role, setRole] = useState("");
  const [sadhna, setSadhna] = useState(null);
  const [showDailyGoalsForm, setShowDailyGoalsForm] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get(`${baseURL}/user/get-user`, {
          withCredentials: true,
          headers: {
            Authorization: `${localStorage.getItem("jwt")}`,
            "Content-Type": "application/json",
          },
        });
        // console.log(data)
        setFirstName(data.data.firstName);
        setSadhna(data.data.sadhna);
        setRole(data.data.role);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();

    // Check if daily goals are filled
    const checkDailyGoals = async () => {
      try {
        const { data } = await axios.get(
          `${baseURL}/sadhna/check-daily-goals`,
          {
            withCredentials: true,
            headers: {
              Authorization: `${localStorage.getItem("jwt")}`,
              "Content-Type": "application/json",
            },
          }
        );
        // console.log(data);
        if (data.data.filled) {
          setShowDailyGoalsForm(false);
          setDailyGoal(data.data.goal);
        } else {
          console.log("Plese fill the goals");
          setShowDailyGoalsForm(true);
        }
      } catch (error) {
        console.error("Error checking daily goals:", error);
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

  // Mock tasks data
  const [tasks, setTasks] = useState([
    { id: 1, name: "16 rounds of chanting", completed: true },
    { id: 2, name: "Attend Mangala Aarti", completed: true },
    { id: 3, name: "Watch 30 mins of lecture", completed: true },
    { id: 4, name: "Read Srila Prabhupada's books", completed: false },
  ]);

  useEffect(() => {
    // Update time every minute
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-amber-50 text-gray-800"
      }`}
    >
      {/* Header */}
      <header
        className={`py-4 px-4 md:px-8 transition-colors duration-300 ${
          darkMode ? "bg-purple-900" : "bg-purple-600"
        } text-white`}
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img src="homefolklogo.svg" alt="Nandgram folk" className="h-20 mr-3" />
            <div>
              <h1 className="text-xl md:text-2xl font-bold">
                Hare Krishna, {firstName}
              </h1>
              <p className="text-xs md:text-sm opacity-90">
                {currentTime || "Loading time..."}
              </p>
            </div>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full ${
              darkMode ? "bg-purple-700" : "bg-purple-500"
            }`}
          >
            {darkMode ? (
              <FiSun className="text-yellow-300" />
            ) : (
              <FiMoon className="text-white" />
            )}
          </button>
        </div>
      </header>

      {/* Action Buttons */}
      <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        <a href="/history" className="w-full">
          <button
            className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-white hover:bg-gray-100 text-gray-800"
            } shadow-sm`}
          >
            <FiList className="text-purple-600" /> View History
          </button>
        </a>

        <a href="/profile" className="w-full">
          <button
            className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-white hover:bg-gray-100 text-gray-800"
            } shadow-sm`}
          >
            <FiUser className="text-purple-600" /> My Profile
          </button>
        </a>

        <button
          onClick={handleLogout}
          className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
            darkMode
              ? "bg-gray-700 hover:bg-gray-600 text-white"
              : "bg-white hover:bg-gray-100 text-gray-800"
          } shadow-sm`}
        >
          <FiLogOut className="text-purple-600" /> Logout
        </button>

        <button
          onClick={() => setShowSadhanaForm(true)}
          className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
            darkMode
              ? "bg-purple-700 hover:bg-purple-600"
              : "bg-purple-600 hover:bg-purple-700"
          } text-white shadow-sm`}
        >
          <FiCalendar /> Fill Today's Sadhna
        </button>

        {role === "admin" && (
          <a href="/admin/dashboard" className="w-full">
            <button
              className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                darkMode
                  ? "bg-red-700 hover:bg-red-600"
                  : "bg-red-600 hover:bg-red-700"
              } text-white shadow-sm`}
            >
              <MdAdminPanelSettings /> Admin Dashboard
            </button>
          </a>
        )}
      </div>

      {/* Maha Mantra Banner */}
      <div
        className={`py-3 px-4 md:px-8 text-center ${
          darkMode ? "bg-gray-800" : "bg-amber-100"
        } shadow-sm`}
      >
        <p className="text-md md:text-lg font-medium">
          <span className={darkMode ? "text-purple-300" : "text-purple-600"}>
            Hare Krishna, Hare Krishna, Krishna Krishna, Hare Hare
          </span>{" "}
          •
          <span className={darkMode ? "text-purple-300" : "text-purple-600"}>
            {" "}
            Hare Rama, Hare Rama, Rama Rama, Hare Hare
          </span>
        </p>
      </div>

      {/* Sadhana Form Popup */}
      {/* showing sadhna form */}
      {showSadhnaForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <SadhanaForm onClose={() => setShowSadhanaForm(false)} />
        </div>
      )}

      <main className="max-w-6xl mx-auto py-6 px-4 md:px-8">
        {/* Daily Dedication */}
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 flex items-center">
            <FiAward className="mr-2 text-purple-600" /> Daily Dedication
          </h2>
          <div
            className={`p-4 md:p-6 rounded-lg shadow-md ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <ul className="list-disc list-inside ">
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
          </div>
        </section>

        {/* showing daily goals setting page if user have not set earlier */}
        {showDailyGoalsForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white max-w-2xl w-full p-8 rounded-xl relative overflow-auto max-h-[90vh]">
              <DailyGoals onClose={() => setShowDailyGoalsForm(false)} />
            </div>
          </div>
        )}

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Consistency Streak */}
          <div
            className={`p-4 md:p-6 rounded-lg shadow-md ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <StreakCard sadhna={sadhna} />
            <div className="mt-4 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-400 to-purple-600"
                style={{ width: `${Math.min(streak * 4.76, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Progress */}
          <div
            className={`p-4 md:p-6 rounded-lg shadow-md ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <FiBook className="mr-2 text-purple-600" /> Monthly Progress
            </h3>
            <MonthlySummaryCard />
          </div>
        </div>

        {/* Divine Quote */}
        <section>
          <div
            className={`p-4 md:p-6 rounded-lg shadow-md ${
              darkMode ? "bg-purple-900" : "bg-purple-100"
            } border-l-4 border-purple-600`}
          >
            <h3
              className={`text-lg font-semibold mb-3 ${
                darkMode ? "bg-purple-900" : "bg-purple-100"
              }`}
            >
              Divine Quote
            </h3>
            <blockquote
              className={`italic  ${
                darkMode ? "bg-purple-900" : "bg-purple-100"
              }`}
            >
              "Any devotee who believes that the holy name of the Lord is
              identified with the Lord is a pure devotee, even though he may
              come in the elementary stage. By his association, others may also
              become vaishnavas."
            </blockquote>
            <p
              className={`mt-2 text-right text-sm ${
                darkMode ? "bg-purple-900" : "bg-purple-100"
              }`}
            >
              - Srila Prabhupada
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;

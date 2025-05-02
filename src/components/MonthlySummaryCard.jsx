import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const MonthlySummaryCard = () => {
  const baseURL=import.meta.env.VITE_BACKEND_URL
  const [isExpanded, setIsExpanded] = useState(false);
  const [summaryData, setSummaryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  useEffect(() => {
    const fetchMonthlySummary = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/sadhna/get-sadhna`,
          {
            withCredentials: true,
            headers: {
              Authorization: `${localStorage.getItem("jwt")}`,
              "Content-Type": "application/json",
            },
          }
        );

        const allEntries = response.data.data;
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();

        const thisMonthEntries = allEntries.filter((entry) => {
          const entryDate = new Date(entry.date);
          return (
            entryDate.getMonth() === currentMonth &&
            entryDate.getFullYear() === currentYear
          );
        });

        const filledDays = thisMonthEntries.length;
        const mangalaArtiDays = thisMonthEntries.filter(
          (entry) => entry.manglaArti?.didAttend
        ).length;

        const readingDays = thisMonthEntries.filter(
          (entry) => entry.bookReading?.didRead
        ).length;

        const totalJapa = thisMonthEntries.reduce(
          (sum, entry) => sum + (entry.chantingRounds || 0),
          0
        );

        const totalDays = today.getDate();

        setSummaryData({
          totalDays,
          filledDays,
          mangalaArtiDays,
          readingDays,
          totalJapa,
        });
      } catch (err) {
        console.error("Failed to fetch summary data", err);
        setError("Unable to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlySummary();
  }, []);

  const {
    mangalaArtiDays,
    readingDays,
    totalJapa,
    totalDays,
  } = summaryData || {};

  return (
    <div className="w-full px-6 md:px-20 mx-auto my-10">
      <motion.div
        onClick={toggleExpand}
        whileHover={{ scale: 1.02 }}
        className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-3xl shadow-xl p-6 transition-all cursor-pointer relative overflow-hidden"
      >
        {/* Gradient glow border */}
        <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-20 pointer-events-none"></div>

        {/* Header */}
        <div className="flex justify-between items-center z-10 relative">
          <h2 className="text-xl font-bold text-purple-800">
            📅 Monthly Dashboard
          </h2>
          <span className="text-black text-sm">{isExpanded ? "▲" : "▼"}</span>
        </div>
        <p className="text-sm text-purple-200 z-10 relative">April 2025</p>

        {/* Expandable Section */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-4 text-purple-800 font-mono space-y-4 z-10 relative"
            >
              {loading && <p>Loading summary...</p>}
              {error && <p className="text-red-500">{error}</p>}
              {!loading && !error && summaryData && (
                <>
                  <DashboardRow
                    label="🕉️ Mangala Aarti"
                    count={mangalaArtiDays}
                    total={totalDays}
                  />
                  <DashboardRow
                    label="📖 Book Reading"
                    count={readingDays}
                    total={totalDays}
                  />
                  <DashboardRow
                    label="📿 Total Japa"
                    value={`${totalJapa} rounds`}
                  />
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

const DashboardRow = ({ label, count, total, value }) => {
  const progress = count && total ? Math.round((count / total) * 100) : null;
  return (
    <div className="flex flex-col">
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span>{value || `${count}/${total} days`}</span>
      </div>
      {progress !== null && (
        <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-400"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default MonthlySummaryCard;

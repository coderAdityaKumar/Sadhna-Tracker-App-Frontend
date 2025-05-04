import React, { useState, useEffect } from "react";
import axios from "axios";

const MonthlySummaryCard = () => {
  const baseURL = import.meta.env.VITE_BACKEND_URL;
  const [summaryData, setSummaryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMonthlySummary = async () => {
      try {
        const response = await axios.get(`${baseURL}/sadhna/get-sadhna`, {
          withCredentials: true,
          headers: {
            Authorization: `${localStorage.getItem("jwt")}`,
            "Content-Type": "application/json",
          },
        });

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

  const { mangalaArtiDays, readingDays, totalJapa, totalDays } =
    summaryData || {};

  return (
    <div className="space-y-4">
      {loading && <p>Loading summary...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && summaryData && (
        <>
          <div>
            <div className="flex justify-between mb-1">
              <span>Mangala Aarti</span>
              <span>{`${mangalaArtiDays}/${totalDays} days`}</span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500"
                style={{ width: `${Math.round((mangalaArtiDays / totalDays) * 100)}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span>Book Reading</span>
              <span>{`${readingDays}/${totalDays} days`}</span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500"
                style={{ width: `${Math.round((readingDays / totalDays) * 100)}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span>Total Japa</span>
              <span>{`${totalJapa} rounds`}</span>
            </div>
            
          </div>
        </>
      )}
    </div>
  );
};

export default MonthlySummaryCard;
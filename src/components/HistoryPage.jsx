import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import axios from "axios";
import SadhanaForm from "../components/SadhanaForm";

const SadhanaHistory = () => {
  const baseURL=process.env.BACKEND_URL
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openMonth, setOpenMonth] = useState(null);
  const [historyData, setHistoryData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleFillForm = (date) => {
    setSelectedDate(date);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedDate(null);
  };

  useEffect(() => {
    const History = async () => {
      try {
        setLoading(true);
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
        setHistoryData(response.data.data);
      } catch (error) {
        setError("Failed to fetch sadhana record");
      } finally {
        setLoading(false);
      }
    };
    History();
  }, []);

  const getAllDatesInMonth = (monthYear) => {
    const start = dayjs(monthYear, "MMMM YYYY").startOf("month");
    const end = start.endOf("month");
    const dates = [];

    for (let d = start; d.isBefore(end) || d.isSame(end); d = d.add(1, "day")) {
      dates.push(d.format("YYYY-MM-DD"));
    }

    return dates;
  };

  const groupedByMonth = historyData.reduce((acc, item) => {
    const month = dayjs(item.date, "DD-MM-YYYY").format("MMMM YYYY");
    if (!acc[month]) acc[month] = [];
    acc[month].push(item);
    return acc;
  }, {});

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
            <SadhanaForm
              onClose={handleCloseForm}
              selectedDate={selectedDate}
            />
          </div>
        </div>
      )}
      <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
        History 📖
      </h2>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {Object.entries(groupedByMonth).map(([month, entries]) => {
        const allDates = getAllDatesInMonth(month);

        return (
          <div key={month} className="border border-gray-300 rounded-md mb-6">
            <div
              className="p-3 bg-green-100 font-semibold cursor-pointer flex justify-between items-center"
              onClick={() => setOpenMonth(openMonth === month ? null : month)}
            >
              <span>📆 {month}</span>
              <span>{openMonth === month ? "🔽" : "▶️"}</span>
            </div>

            {openMonth === month && (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm border border-gray-200">
                  <thead className="bg-purple-100 sticky top-0 z-10">
                    <tr>
                      <th className="p-2 border">📅 Date</th>
                      <th className="p-2 border">🌅 Mangala Aarti</th>
                      <th className="p-2 border">⏱️ Late (min)</th>
                      <th className="p-2 border">📚 Study Hours</th>
                      <th className="p-2 border">📿 Japa Count</th>
                      <th className="p-2 border">📖 Book</th>
                      <th className="p-2 border">⏳ Reading (min)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allDates.map((date) => {
                      const entry = entries.find(
                        (item) =>
                          dayjs(item.date, "DD-MM-YYYY").format(
                            "YYYY-MM-DD"
                          ) === date
                      );

                      const today = dayjs();
                      const dateObj = dayjs(date);
                      const isFuture = dateObj.isAfter(today, "day");
                      const isWithinLastTwoDays =
                        dateObj.isSame(today.subtract(1, "day"), "day") ||
                        dateObj.isSame(today.subtract(2, "day"), "day");

                      return (
                        <tr key={date} className="text-center even:bg-gray-50">
                          <td className="p-2 border">{date}</td>

                          {entry ? (
                            <>
                              <td className="p-2 border">
                                {entry.manglaArti?.didAttend
                                  ? "Attended"
                                  : "Not Attended"}
                              </td>
                              <td className="p-2 border">
                                {entry.manglaArti?.minsLate}
                              </td>
                              <td className="p-2 border">{entry.studyHours}</td>
                              <td className="p-2 border">
                                {entry.chantingRounds}
                              </td>
                              <td className="p-2 border">
                                {entry.bookReading?.bookName}
                              </td>
                              <td className="p-2 border">
                                {entry.bookReading?.duration}
                              </td>
                            </>
                          ) : (
                            <>
                              <td className="p-2 border text-gray-400 italic">
                                —
                              </td>
                              <td className="p-2 border text-gray-400 italic">
                                —
                              </td>
                              <td className="p-2 border text-gray-400 italic">
                                —
                              </td>
                              <td className="p-2 border text-gray-400 italic">
                                —
                              </td>
                              <td className="p-2 border text-gray-400 italic">
                                —
                              </td>
                              <td className="p-2 border">
                                {isWithinLastTwoDays && (
                                  <button
                                    className="bg-blue-500 text-white px-3 py-1 text-xs rounded hover:bg-blue-600"
                                    onClick={() => handleFillForm(date)}
                                  >
                                    Fill
                                  </button>
                                )}
                              </td>
                            </>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SadhanaHistory;

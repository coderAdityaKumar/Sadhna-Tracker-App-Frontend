import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dayjs from "dayjs";
import axios from "axios";
import SadhanaForm from "../components/SadhanaForm";
import { FiCalendar, FiChevronDown, FiChevronUp, FiPlusCircle, FiCheck, FiX, FiClock, FiBook, FiSunrise, FiAward } from "react-icons/fi";

const SadhanaHistory = () => {
  const baseURL = import.meta.env.VITE_BACKEND_URL;
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
    // Refresh data after form submission
    fetchHistory();
  };

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseURL}/sadhna/get-sadhna`, {
        withCredentials: true,
        headers: {
          Authorization: `${localStorage.getItem("jwt")}`,
          "Content-Type": "application/json",
        },
      });
      setHistoryData(response.data.data);
      setError(null);
    } catch (error) {
      setError("Failed to fetch sadhana records");
      console.error("Error fetching history:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
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

  // Sort months in descending order (newest first)
  const sortedMonths = Object.keys(groupedByMonth).sort((a, b) => 
    dayjs(b, "MMMM YYYY").diff(dayjs(a, "MMMM YYYY"))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between"
        >
          <h1 className="text-3xl font-bold text-purple-800 flex items-center">
            <FiCalendar className="mr-3" />
            Sadhana History
          </h1>
        </motion.div>
        <p className="text-gray-600 mt-2">Track your spiritual journey day by day</p>
      </div>

      {/* Loading and Error States */}
      {loading && (
        <div className="max-w-6xl mx-auto flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      )}

      {error && (
        <div className="max-w-6xl mx-auto bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          <p>{error}</p>
        </div>
      )}

      {/* History Content */}
      <div className="max-w-6xl mx-auto space-y-6">
        {sortedMonths.length === 0 && !loading && (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <FiAward className="mx-auto text-4xl text-purple-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">No Sadhana Records Found</h3>
            <p className="text-gray-600 mt-2">Start your spiritual journey by adding your first sadhana entry</p>
          </div>
        )}

        {sortedMonths.map((month) => {
          const allDates = getAllDatesInMonth(month);
          const entries = groupedByMonth[month];

          return (
            <div key={month} className="bg-white rounded-xl shadow-md overflow-hidden">
              {/* Month Header */}
              <div
                className="p-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold cursor-pointer flex justify-between items-center"
                onClick={() => setOpenMonth(openMonth === month ? null : month)}
              >
                <div className="flex items-center">
                  <FiCalendar className="mr-3" />
                  <span className="text-lg">{month}</span>
                </div>
                {openMonth === month ? (
                  <FiChevronUp className="text-xl" />
                ) : (
                  <FiChevronDown className="text-xl" />
                )}
              </div>

              {/* Month Content */}
              {openMonth === month && (
                <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="sticky top-0 bg-gray-50 sticky">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <FiSunrise className="inline mr-1" /> Arti
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <FiClock className="inline mr-1" /> Late
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <FiBook className="inline mr-1" /> Study
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Japa
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Book
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Reading
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {allDates.map((date) => {
                        const entry = entries.find(
                          (item) =>
                            dayjs(item.date, "DD-MM-YYYY").format("YYYY-MM-DD") === date
                        );

                        const today = dayjs();
                        const dateObj = dayjs(date);
                        const isFuture = dateObj.isAfter(today, "day");
                        const isWithinLastTwoDays =
                          dateObj.isSame(today.subtract(1, "day"), "day") ||
                          dateObj.isSame(today.subtract(2, "day"), "day");

                        return (
                          <tr key={date} className={isFuture ? "bg-gray-50" : ""}>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                              {dayjs(date).format("MMM D")}
                              <span className="block text-xs text-gray-500">
                                {dayjs(date).format("dddd")}
                              </span>
                            </td>

                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                              {entry ? (
                                entry.manglaArti?.didAttend ? (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                    <FiCheck className="mr-1" /> Attended
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                    <FiX className="mr-1" /> Missed
                                  </span>
                                )
                              ) : (
                                <span className="text-gray-400">—</span>
                              )}
                            </td>

                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                              {entry?.manglaArti?.minsLate || (
                                <span className="text-gray-400">—</span>
                              )}
                            </td>

                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                              {entry?.studyHours || (
                                <span className="text-gray-400">—</span>
                              )}
                            </td>

                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                              {entry?.chantingRounds || (
                                <span className="text-gray-400">—</span>
                              )}
                            </td>

                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                              {entry?.bookReading?.bookName || (
                                <span className="text-gray-400">—</span>
                              )}
                            </td>

                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                              {entry?.bookReading?.duration || (
                                <span className="text-gray-400">—</span>
                              )}
                            </td>

                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                              {!entry && !isFuture && isWithinLastTwoDays && (
                                <button
                                  onClick={() => handleFillForm(date)}
                                  className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                >
                                  <FiPlusCircle className="mr-1" /> Add
                                </button>
                              )}
                            </td>
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

      {/* Sadhana Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <h3 className="text-xl font-bold text-purple-800">
                {selectedDate ? `Sadhana for ${dayjs(selectedDate).format("MMMM D, YYYY")}` : "Add Sadhana"}
              </h3>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={handleCloseForm}
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <SadhanaForm
                onClose={handleCloseForm}
                selectedDate={selectedDate}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SadhanaHistory;
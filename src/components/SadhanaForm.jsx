import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  FiX,
  FiCheck,
  FiClock,
  FiBook,
  FiBookOpen,
  FiAward,
  FiSunrise
} from "react-icons/fi";
import { GiPrayerBeads } from "react-icons/gi";

const SadhanaForm = ({ onClose, selectedDate }) => {
  const baseURL = import.meta.env.VITE_BACKEND_URL;

  const today = new Date();
  const formattedDate = selectedDate || today.toLocaleDateString("en-CA");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    attendedMangalaAarti: false,
    lateMinutes: 0,
    studyHours: "",
    chantingRounds: "",
    bookName: "",
    readingMinutes: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const {
      attendedMangalaAarti,
      lateMinutes,
      studyHours,
      chantingRounds,
      bookName,
      readingMinutes
    } = formData;

    const dataToSend = {
      date: formattedDate,
      userManglaArti: {
        didAttend: attendedMangalaAarti,
        minsLate: attendedMangalaAarti ? Number(lateMinutes) : 0
      },
      studyHours: Number(studyHours),
      userChantingRounds: Number(chantingRounds),
      userBookReading: {
        didRead: bookName.trim() !== "",
        bookName: bookName.trim() || undefined,
        duration: bookName.trim() !== "" ? Number(readingMinutes) : undefined
      }
    };

    try {
      const { data } = await axios.post(
        `${baseURL}/sadhna/create-sadhna`,
        dataToSend,
        {
          withCredentials: true,
          headers: {
            Authorization: `${localStorage.getItem("jwt")}`,
            "Content-Type": "application/json"
          }
        }
      );
      toast.success(data.message || "Sadhana submitted successfully!");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to submit sadhana report"
      );
    }finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
      {/* Header */}
      <div className="bg-purple-600 text-white p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center">
            <FiAward className="mr-2" />
            Daily Sadhana
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-purple-700 transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-2 text-purple-100 flex items-center">
          <FiClock className="mr-2" />
          <span>{formattedDate}</span>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6 overflow-y-auto max-h-[70vh]">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Core Practices */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg text-purple-600 dark:text-purple-400 border-b pb-2">
              Core Practices
            </h3>

            {/* Mangala Arti */}
            <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:items-center md:justify-between">
              <label className="flex items-center cursor-pointer">
                <div className="relative mr-3">
                  <input
                    type="checkbox"
                    name="attendedMangalaAarti"
                    checked={formData.attendedMangalaAarti}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div
                    className={`block w-10 h-6 rounded-full ${
                      formData.attendedMangalaAarti
                        ? "bg-green-500"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  ></div>
                  <div
                    className={`absolute left-1 top-1 w-4 h-4 rounded-full transition transform ${
                      formData.attendedMangalaAarti
                        ? "translate-x-4 bg-white"
                        : "bg-white"
                    }`}
                  ></div>
                </div>
                <span className="flex text-amber-500 items-center">
                  <FiSunrise className="mr-2 text-amber-500" />
                  Mangala Arti
                </span>
              </label>

              {formData.attendedMangalaAarti && (
                <div className="flex text-amber-500 items-center space-x-2">
                  <input
                    type="number"
                    name="lateMinutes"
                    value={formData.lateMinutes}
                    onChange={handleChange}
                    placeholder="Minutes late"
                    className="w-20 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <label className="cursor-pointer">Minutes Late</label>
                </div>
              )}
            </div>

            {/* Japa Meditation */}
            <div className="flex items-center space-x-4 ">
              <div className="flex-1">
                <label className="flex items-center mb-1 text-purple-500">
                  <GiPrayerBeads className="mr-2 text-purple-400" />
                  Japa Rounds
                </label>
                <input
                  type="number"
                  name="chantingRounds"
                  value={formData.chantingRounds}
                  onChange={handleChange}
                  placeholder="16"
                  className="text-white w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Book Reading */}
            <div className="space-y-2">
              <label className="flex items-center text-blue-500">
                <FiBookOpen className="mr-2 text-blue-500" />
                Book Reading
              </label>
              <input
                type="text"
                name="bookName"
                value={formData.bookName}
                onChange={handleChange}
                placeholder="Book name"
                className="text-white w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-2"
              />
              {formData.bookName.trim() && (
                <input
                  type="number"
                  name="readingMinutes"
                  value={formData.readingMinutes}
                  onChange={handleChange}
                  placeholder="Reading minutes"
                  className="text-white w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              )}
            </div>

            {/* Study Hours */}
            <div>
              <label className="flex items-center mb-1 text-green-500">
                <FiBook className="mr-2 " />
                Study Hours
              </label>
              <input
                type="number"
                name="studyHours"
                value={formData.studyHours}
                onChange={handleChange}
                placeholder="Hours"
                className="text-white w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-between space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg font-medium transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
            type="submit"
            disabled={loading}
            className={` flex-1 justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white 
    ${
      loading
        ? "bg-purple-400 cursor-not-allowed"
        : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
    }
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 group`}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
            ) : (
              <>
                <span className="group-hover:scale-105 transition-transform">
                  Sign In
                </span>
                
              </>
            )}
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SadhanaForm;

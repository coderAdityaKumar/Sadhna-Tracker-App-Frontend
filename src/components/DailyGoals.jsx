import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function DailyGoals({ onClose }) {
  const [roundsOfChanting, setRoundsOfChanting] = useState("");
  const [attendMangalaAarti, setAttendMangalaAarti] = useState("");
  const [watchLectureMinutes, setWatchLectureMinutes] = useState("");
  const [readBookMinutes, setReadBookMinutes] = useState("");
  const baseURL=process.env.BACKEND_URL

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${baseURL}/sadhna/set-daily-goals`,
        {
          roundsOfChanting,
          attendMangalaAarti,
          watchLectureMinutes,
          readBookMinutes,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `${localStorage.getItem("jwt")}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(response.data.message || "Goals saved successfully!");
      if (onClose) onClose(); // Close form after submit
    } catch (error) {
      console.error("Error setting daily goals:", error);
      toast.error(
        error.response?.data?.message || "Failed to set daily goals."
      );
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-6">
      <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
        📜 My Daily Sadhana Commitments
      </h2>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-gray-700">🧘‍♂️ I will do</span>
          <input
            type="number"
            value={roundsOfChanting}
            onChange={(e) => setRoundsOfChanting(Number(e.target.value))}
            className="w-16 px-2 py-1 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <span className="text-gray-700">rounds of chanting daily</span>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={attendMangalaAarti}
            onChange={() => setAttendMangalaAarti(!attendMangalaAarti)}
            className="h-5 w-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-400"
          />
          <label className="text-gray-700">
            🌅 I will attend Mangala Aarti daily
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-gray-700">🎧 I will watch</span>
          <input
            type="number"
            value={watchLectureMinutes}
            onChange={(e) => setWatchLectureMinutes(Number(e.target.value))}
            className="w-16 px-2 py-1 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <span className="text-gray-700">minutes of lecture every day</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-gray-700">
            📖 I will read Srila Prabhupada's book for
          </span>
          <input
            type="number"
            value={readBookMinutes}
            onChange={(e) => setReadBookMinutes(Number(e.target.value))}
            className="w-16 px-2 py-1 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <span className="text-gray-700">minutes daily</span>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold py-2 mt-4 rounded-xl transition duration-300 shadow-lg"
        >
          Commit 💪
        </button>
        <div className="flex justify-center items-center text-red-950">
          <p>Only once in a month you can fill it!</p>
        </div>
      </form>
    </div>
  );
}

export default DailyGoals;

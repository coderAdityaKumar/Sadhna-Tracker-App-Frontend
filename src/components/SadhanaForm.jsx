import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const SadhanaForm = ({ onClose, selectedDate }) => {
  const baseURL=process.env.BACKEND_URL

  const formattedDate = selectedDate || new Date().toISOString().split("T")[0];

  const [attendedMangalaAarti, setAttendedMangalaAarti] = useState(false);
  const [lateMinutes, setLateMinutes] = useState(0);
  const [studyHours, setStudyHours] = useState("");
  const [chantingRounds, setChantingRounds] = useState("");
  const [bookName, setBookName] = useState("");
  const [readingMinutes, setReadingMinutes] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      date: formattedDate,
      userManglaArti: {
        didAttend: attendedMangalaAarti,
        minsLate: attendedMangalaAarti ? Number(lateMinutes) : 0,
      },
      studyHours: Number(studyHours),
      userChantingRounds: Number(chantingRounds),
      userBookReading: {
        didRead: bookName.trim() !== "",
        bookName: bookName.trim() || undefined,
        duration: bookName.trim() !== "" ? Number(readingMinutes) : undefined,
      },
    };

    try {
      const { data } = await axios.post(
        `${baseURL}/sadhna/create-sadhna`,
        dataToSend,
        {
          withCredentials: true,
          headers: {
            Authorization: `${localStorage.getItem("jwt")}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(data.message || "Sadhana submitted successfully!");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to submit sadhana report");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold text-center">🧘‍♂️ Sadhana Form</h2>

        <div className="flex justify-center items-center gap-2">
          <label className="font-semibold">📅 Date:</label>
          <input
            type="date"
            value={formattedDate}
            readOnly
            className="cursor-not-allowed border rounded p-2 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="mangala_aarti"
              checked={attendedMangalaAarti}
              onChange={(e) => setAttendedMangalaAarti(e.target.checked)}
              className="w-5 h-5 text-green-600"
            />
            <label htmlFor="mangala_aarti" className="font-medium">Attended Mangala Arti</label>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="lateMinutes">Minutes Late</label>
            <input
              type="number"
              id="lateMinutes"
              value={lateMinutes}
              disabled={!attendedMangalaAarti}
              onChange={(e) => setLateMinutes(e.target.value)}
              className="flex-1 border rounded p-2 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label>📚 Study Hours</label>
            <input
              type="number"
              value={studyHours}
              onChange={(e) => setStudyHours(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div>
            <label>🧘 Chanting Rounds</label>
            <input
              type="number"
              value={chantingRounds}
              onChange={(e) => setChantingRounds(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div>
            <label>📖 Book Name</label>
            <input
              type="text"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label>⏳ Reading Minutes</label>
            <input
              type="number"
              value={readingMinutes}
              onChange={(e) => setReadingMinutes(e.target.value)}
              className="w-full border rounded p-2"
              disabled={bookName.trim() === ""}
            />
          </div>
        </div>

        <div className="space-y-2">
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded"
          >
            Submit Sadhana
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full text-sm text-gray-500 hover:underline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SadhanaForm;
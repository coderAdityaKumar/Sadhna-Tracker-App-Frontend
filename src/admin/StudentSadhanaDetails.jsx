import React, { useState } from "react";
import dayjs from "dayjs";
import { motion, AnimatePresence } from "framer-motion";

const tableVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
};

const rowVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

const getAllDatesInMonth = (monthYear) => {
  const start = dayjs(monthYear, "MMMM YYYY").startOf("month");
  const end = start.endOf("month");
  const dates = [];

  for (let d = start; d.isBefore(end) || d.isSame(end); d = d.add(1, "day")) {
    dates.push(d.format("YYYY-MM-DD"));
  }

  return dates;
};

const StudentSadhanaDetails = ({ studentName, data, onClose }) => {
  const [openMonth, setOpenMonth] = useState(null);

  const groupedByMonth = data.reduce((acc, item) => {
    const month = dayjs(item.date).format("MMMM YYYY");
    if (!acc[month]) acc[month] = [];
    acc[month].push(item);
    return acc;
  }, {});

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-5xl max-h-[90vh] min-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-800"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-green-700">
            {studentName}'s Sadhana History
          </h2>
          <button
            className="text-red-600 font-bold hover:text-red-800 transition-colors"
            onClick={onClose}
          >
            ✖
          </button>
        </div>

        {Object.entries(groupedByMonth).map(([month, entries]) => {
          const allDates = getAllDatesInMonth(month);

          return (
            <motion.div
              key={month}
              className="border border-gray-300 rounded-md mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="p-3 bg-green-100 font-semibold cursor-pointer flex justify-between items-center hover:bg-green-200 transition-colors"
                onClick={() => setOpenMonth(openMonth === month ? null : month)}
              >
                <span>📆 {month}</span>
                <span>{openMonth === month ? "🔽" : "▶️"}</span>
              </div>

              <AnimatePresence initial={false}>
                {openMonth === month && (
                  <motion.div
                    key="table"
                    variants={tableVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="overflow-x-auto max-h-[400px] overflow-y-auto"
                  >
                    <table className="min-w-full text-sm border border-gray-200 mt-2">
                      <thead className="bg-purple-100 sticky top-0 z-30">
                        <tr>
                          <th className="p-2 border">Date</th>
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
                              dayjs(item.date).format("YYYY-MM-DD") === date
                          );

                          return (
                            <motion.tr
                              key={date}
                              variants={rowVariants}
                              className="text-center even:bg-gray-50"
                            >
                              <td className="p-2 border">
                                {dayjs(date).format("YYYY-MM-DD")}
                              </td>

                              {entry ? (
                                <>
                                  <td className="p-2 border">
                                    {entry.manglaArti?.didAttend ? "✅" : "❌"}
                                  </td>
                                  <td className="p-2 border">
                                    {entry.manglaArti?.didAttend
                                      ? entry.manglaArti.minsLate
                                      : "-"}
                                  </td>
                                  <td className="p-2 border">
                                    {entry.studyHours ?? "-"}
                                  </td>
                                  <td className="p-2 border">
                                    {entry.chantingRounds ?? "-"}
                                  </td>
                                  <td className="p-2 border">
                                    {entry.bookReading?.didRead
                                      ? entry.bookReading.bookName
                                      : "-"}
                                  </td>
                                  <td className="p-2 border">
                                    {entry.bookReading?.didRead
                                      ? entry.bookReading.duration
                                      : "-"}
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
                                  <td className="p-2 border text-gray-400 italic">
                                    —
                                  </td>
                                </>
                              )}
                            </motion.tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default StudentSadhanaDetails;

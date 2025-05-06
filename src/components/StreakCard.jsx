import React, { useMemo } from "react";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { FiClock } from "react-icons/fi";

const StreakCard = ({ sadhna }) => {
  // console.log(sadhna);
  const streak = useMemo(() => {
    if (!sadhna || sadhna.length === 0) return 0;

    const filledDates = sadhna.map((entry) =>
      dayjs(entry.date, "DD-MM-YYYY").format("YYYY-MM-DD")
    );

    const yesterday = dayjs().subtract(1, "day").startOf("day");
    let count = 0;

    for (let i = 0; ; i++) {
      const checkDate = yesterday.subtract(i, "day").format("YYYY-MM-DD");
      if (filledDates.includes(checkDate)) {
        console.log("run");
        count++;
      } else {
        break;
      }
    }

    return count;
  }, [sadhna]);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3 flex items-center">
        <FiClock className="mr-2 text-purple-600" /> Consistency
      </h3>
      <div className="flex items-center">
      <div className="text-4xl font-bold text-purple-600 mr-4">{streak}</div>
      {streak > 30 ? (
        <p className="font-medium">
          🚀 Day streak! Incredible dedication!
        </p>
      ) : streak > 0 ? (
        <p className="font-medium">Day streak! Hari bol! 🙌</p>
      ) : (
        <p className="font-mono text-gray-500">
          No current streak. Start today!
        </p>
      )}
      </div>
    </div>
  );
};

export default StreakCard;

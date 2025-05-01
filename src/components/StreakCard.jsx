import React, { useMemo } from "react";
import dayjs from "dayjs";
import { motion } from "framer-motion";

const StreakCard = ({ sadhna }) => {
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
    <motion.div whileHover={{ scale: 1.02 }}>
      <h2 className="text-xl font-semibold mb-2">🔥 Consistency</h2>
      {streak > 30 ? (
        <p className="font-mono text-green-700">
          🚀 {streak}-day streak! Incredible dedication!
        </p>
      ) : streak > 0 ? (
        <p className="font-mono">{streak}-day streak! Hari bol! 🙌</p>
      ) : (
        <p className="font-mono text-gray-500">
          No current streak. Start today!
        </p>
      )}
    </motion.div>
  );
};

export default StreakCard;

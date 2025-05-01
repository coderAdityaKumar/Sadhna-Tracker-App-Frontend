import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import StudentSadhanaDetails from "./StudentSadhanaDetails.jsx";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchStudents = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/user/getAllUsers", {
        withCredentials: true,
        headers: {
          Authorization: `${localStorage.getItem("jwt")}`,
        },
      });
      console.log(data.data)
      setStudents(data.data || []);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents = students.filter((student) =>
    `${student.firstName} ${student.lastName || ""}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen p-2 flex flex-col items-center justify-center relative">
      <a href="/admin/login">
        <button className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300 text-sm md:text-base shadow absolute top-2 right-2">
          🔓 Logout
        </button>
      </a>

      <div className="w-full max-w-lg flex flex-col shadow-xl">
        <h1 className="text-center text-3xl text-purple-800 font-Quintessential font-bold mb-4">
          📊 Admin Dashboard
        </h1>

        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <h2 className="text-xl font-semibold mb-2 text-center p-2">
          🙋🏻‍♂️ Student List
        </h2>

        <motion.div className="max-h-60 overflow-y-auto font-mono scrollbar-thin scrollbar-thumb-purple-800 scrollbar-track-green-100">
          <ul className="divide-y divide-purple-200">
            {filteredStudents.map((student) => (
              <li
                key={student._id}
                className="cursor-pointer hover:bg-purple-50 px-4 py-2 transition duration-150"
                onClick={() => setSelectedStudent(student)}
              >
                {student.firstName} {student.lastName}
              </li>
            ))}
          </ul>
        </motion.div>

        <AnimatePresence mode="wait">
          {selectedStudent && (
            <StudentSadhanaDetails
              key={selectedStudent._id}
              studentName={`${selectedStudent.firstName} ${selectedStudent.lastName || ""}`}
              data={selectedStudent.sadhna} // assuming 'sadhnas' is the populated array from backend
              onClose={() => setSelectedStudent(null)}
              onRefresh={fetchStudents} // optional: if you want to refresh after update
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

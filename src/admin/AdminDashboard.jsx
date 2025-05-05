import React, { useEffect, useState } from "react";
import axios from "axios";
import AppointAdmin from "./AppointAdmin.jsx";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiLogOut,
  FiHome,
  FiUsers,
  FiRefreshCw,
  FiX,
  FiShield,
} from "react-icons/fi";
import StudentSadhanaDetails from "./StudentSadhanaDetails.jsx";

export default function AdminDashboard() {
  const baseURL = import.meta.env.VITE_BACKEND_URL;
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHostel, setSelectedHostel] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAppointAdmin, setShowAppointAdmin] = useState(false);
  const [currentUserRole, setCurrentUserRole] = useState("");

  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${baseURL}/user/getAllUsers`, {
        withCredentials: true,
        headers: {
          Authorization: `${localStorage.getItem("jwt")}`,
        },
      });
      setStudents(data.data || []);
      setFilteredStudents(data.data || []);
      const response = await axios.get(`${baseURL}/user/get-user`, {
        withCredentials: true,
        headers: {
          Authorization: `${localStorage.getItem("jwt")}`,
          "Content-Type": "application/json",
        },
      });
      setCurrentUserRole(response.data.data.role);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    let result = [...students];

    // Filter by hostel
    if (selectedHostel) {
      result = result.filter((student) => student.hostel === selectedHostel);
    }

    // Filter by search query
    if (searchQuery) {
      result = result.filter((student) =>
        `${student.firstName} ${student.lastName || ""}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }

    setFilteredStudents(result);
  }, [searchQuery, selectedHostel, students]);

  // Extract unique hostels from students data
  const hostels = [
    ...new Set(students.map((student) => student.hostel).filter(Boolean)),
  ];

  const handleLogout = () => {
    // 1. Remove the token from localStorage
    localStorage.removeItem("jwt");

    toast.success("Logged out successfully!");

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4 md:p-8">
      {/* Main Dashboard Card */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl font-bold mb-1">📊 Admin Dashboard</h1>
              <p className="opacity-90">Manage student sadhana records</p>
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-4 md:mt-0">
              <button
                onClick={fetchStudents}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-purple-300 text-purple-600 text-sm font-medium rounded-lg shadow-md hover:bg-purple-50 transition-all duration-300 w-full sm:w-auto"
              >
                <FiRefreshCw className={`${isLoading ? "animate-spin" : ""}`} />
                Refresh
              </button>

              {currentUserRole === "superadmin" && (
                <button
                  onClick={() => setShowAppointAdmin(true)}
                  className="flex items-center gap-2 justify-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg shadow-md hover:bg-green-700 transition-all duration-300 w-full sm:w-auto"
                >
                  <FiShield />
                  Manage Admins
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Hostel Filter */}
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold mb-3 text-gray-700 flex items-center">
            <FiHome className="mr-2" /> Filter by Hostel
          </h3>
          <div className="flex flex-wrap gap-2">
            {hostels.map((hostel) => (
              <button
                key={hostel}
                onClick={() =>
                  setSelectedHostel(selectedHostel === hostel ? null : hostel)
                }
                className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                  selectedHostel === hostel
                    ? "bg-purple-600 text-white shadow-md"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                }`}
              >
                {hostel}
              </button>
            ))}
            {selectedHostel && (
              <button
                onClick={() => setSelectedHostel(null)}
                className="px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm transition-all duration-200 flex items-center"
              >
                <FiX className="mr-1" /> Clear
              </button>
            )}
          </div>
        </div>

        {/* Search and Student List */}
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-700 flex items-center">
              <FiUsers className="mr-2" /> Student List
            </h3>
            <input
              type="text"
              placeholder="Search students by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : (
            <motion.div
              className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {filteredStudents.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  No students found
                  {selectedHostel ? ` in ${selectedHostel}` : ""}
                </div>
              ) : (
                <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                  {filteredStudents.map((student) => (
                    <motion.li
                      key={student._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="cursor-pointer hover:bg-purple-50 transition duration-150"
                      onClick={() => setSelectedStudent(student)}
                    >
                      <div className="px-4 py-3 flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-900">
                            {student.firstName} {student.lastName}
                          </p>
                          {student.hostel && (
                            <p className="text-xs text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full inline-block mt-1">
                              {student.hostel}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Student Details Modal - Using your existing component */}
      <AnimatePresence>
        {selectedStudent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedStudent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <StudentSadhanaDetails
                key={selectedStudent._id}
                studentName={`${selectedStudent.firstName} ${
                  selectedStudent.lastName || ""
                }`}
                data={selectedStudent.sadhna}
                onClose={() => setSelectedStudent(null)}
                onRefresh={fetchStudents}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Manage admins */}
      <AnimatePresence>
        {showAppointAdmin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowAppointAdmin(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <AppointAdmin
                currentUserRole={currentUserRole}
                onClose={() => setShowAppointAdmin(false)}
                refreshUsers={fetchStudents}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import axios from "axios";

function EditProfile() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [hostel, setHostel] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const baseURL=import.meta.env.BACKEND_URL

  const navigateTo = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.put(
        `${baseURL}/user/update-user`,
        {
          firstname,
          lastname,
          email,
          hostel},
        {
          withCredentials: true,
          headers: {
            Authorization: `${localStorage.getItem("jwt")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setTimeout(() => {
        setIsLoading(false);
        toast.success(data.message || "Updated Successfully");
        navigateTo("/");
      }, 1000);
      setFirstname("");
      setLastname("");
      setEmail("");
      setHostel("");
    } catch (error) {
      const errorMessage = Array.isArray(error.response?.data?.errors)
        ? error.response.data.errors.join(", ")
        : error.response?.data?.errors ||
          error.response?.data?.message ||
          "Updation failed";
      toast.error(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-gradient-to-br from-yellow-100 to-pink-200 p-2 md:p-12 font-sans"
    >
      <motion.h2
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-4xl text-center font-extrabold text-purple-800 mb-8"
      >
        Edit Your Profile
      </motion.h2>
      <form
        onSubmit={handleUpdate}
        className="max-w-3xl mx-auto bg-white bg-opacity-70 rounded-3xl shadow-xl p-8 space-y-6 border border-purple-300"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <label className="text-purple-800">First Name</label>
            <input
              type="text"
              value={firstname}
              required
              onChange={(e) => setFirstname(e.target.value)}
              placeholder="Your First Name"
              className="w-full mt-1 px-4 py-2 rounded-xl bg-white text-purple-900 border border-purple-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </motion.div>

          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <label className="text-purple-800">Last Name</label>
            <input
              type="text"
              value={lastname}
              required
              onChange={(e) => setLastname(e.target.value)}
              placeholder="Your Last Name"
              className="w-full mt-1 px-4 py-2 rounded-xl bg-white text-purple-900 border border-purple-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <label className="text-purple-800">Email</label>
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            className="w-full mt-1 px-4 py-2 rounded-xl bg-white text-purple-900 border border-purple-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </motion.div>

        <motion.div
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <label className="text-purple-800">Select your Hostel</label>
          <select
            value={hostel}
            required
            onChange={(e) => setHostel(e.target.value)}
            className="w-full mt-1 px-4 py-2 rounded-xl bg-white text-purple-900 border border-purple-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">-- Choose an option --</option>
            <option value="Chaitanya Niwas">Chaitanya Niwas</option>
            <option value="Nityanda Niwas">Nityanda Niwas</option>
            <option value="Govinda Niwas">Govinda Niwas</option>
          </select>
        </motion.div>

        <div className="flex justify-center pt-4">
          <motion.button
            type="submit"
            disabled={isLoading}
            initial={{ scale: 1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-lg px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            {isLoading ? (
              <div className="animate-spin h-6 w-6 border-4 border-white border-t-transparent rounded-full" />
            ) : (
              "Update Details"
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}

export default EditProfile;

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
  const baseURL=import.meta.env.VITE_BACKEND_URL

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
  transition={{ duration: 0.8 }}
>
  <form
    onSubmit={handleUpdate}
    className="space-y-6 font-sans"
  >
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* First Name Field */}
      <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
        <label className="block text-sm font-medium text-purple-800 mb-1">First Name</label>
        <input
          type="text"
          value={firstname}
          required
          onChange={(e) => setFirstname(e.target.value)}
          className="w-full px-4 py-2 rounded-xl bg-white border border-purple-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </motion.div>

      {/* Last Name Field */}
      <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
        <label className="block text-sm font-medium text-purple-800 mb-1">Last Name</label>
        <input
          type="text"
          value={lastname}
          required
          onChange={(e) => setLastname(e.target.value)}
          className="w-full px-4 py-2 rounded-xl bg-white border border-purple-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </motion.div>
    </div>

    {/* Email */}
    <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
      <label className="block text-sm font-medium text-purple-800 mb-1">Email</label>
      <input
        type="email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 rounded-xl bg-white border border-purple-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />
    </motion.div>

    {/* Hostel Select */}
    <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
      <label className="block text-sm font-medium text-purple-800 mb-1">Select your Hostel</label>
      <select
        value={hostel}
        required
        onChange={(e) => setHostel(e.target.value)}
        className="w-full px-4 py-2 rounded-xl bg-white border border-purple-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        <option value="">-- Choose an option --</option>
        <option value="Chaitanya Niwas">Chaitanya Niwas</option>
        <option value="Nityanda Niwas">Nityanda Niwas</option>
        <option value="Govinda Niwas">Govinda Niwas</option>
      </select>
    </motion.div>

    {/* Submit Button */}
    <div className="flex justify-center pt-4">
      <motion.button
        type="submit"
        disabled={isLoading}
        whileTap={{ scale: 0.95 }}
        className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-lg px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition duration-300"
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

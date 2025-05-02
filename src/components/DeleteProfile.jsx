import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import axios from "axios";
import { FaRegSadTear } from "react-icons/fa";

function DeleteProfile() {
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigateTo = useNavigate();


  const handleDelete = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const baseURL=import.meta.env.BACKEND_URL
    try {
      const { data } = await axios.delete(
        `${baseURL}/user/delete-user`,
        {
          withCredentials: true,
          headers: { 
            "Authorization": `${localStorage.getItem("jwt")}`,
            "Content-Type": "multipart/form-data" 
          },
        }
      );
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      toast.success(data.message || "Deleted Successfully");
      localStorage.removeItem("jwt");
      navigateTo("/login");
    } catch (error) {
      const errorMessage = Array.isArray(error.response?.data?.errors)
        ? error.response.data.errors.join(", ")
        : error.response?.data?.errors ||
          error.response?.data?.message ||
          "Deletion failed";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-yellow-100 via-blue-100 to-indigo-200 bg-fixed">
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl px-10 py-12 w-[95%] max-w-lg border border-yellow-200"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-yellow-800 font-serif">
            <span className="text-indigo-700">हरे कृष्णा 🙏</span>
          </h2>
          <p className="text-gray-700 mt-2 font-medium">
            Are you sure you want to delete your profile?
          </p>
          <FaRegSadTear className="mx-auto text-4xl text-red-500 mt-4 animate-pulse" />
        </motion.div>

        <form
          onSubmit={handleDelete}
          className="flex justify-center gap-6 mt-10"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="button"
            onClick={() => navigateTo("/profile")}
            className="bg-green-500 text-white px-6 py-2 rounded-xl shadow-md hover:bg-green-700 font-semibold transition"
          >
            No 🙌
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={isLoading}
            type="submit"
            className="bg-red-600 text-white px-6 py-2 rounded-xl shadow-md hover:bg-red-800 font-semibold transition"
          >
            {isLoading ? "Deleting..." : "Yes 😢"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default DeleteProfile;

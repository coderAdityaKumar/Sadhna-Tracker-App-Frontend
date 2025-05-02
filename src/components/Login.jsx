import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const baseURL=process.env.BACKEND_URL
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();

  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${baseURL}/auth/login-user`,
        { email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      
      if (response.data.data && response.data.success) {
        setEmail("");
        setPassword("");
        localStorage.setItem("jwt", response.data.data.token);
        toast.success("Login successful!");
        navigateTo("/");
        
      } else {
        console.log(response.data);
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-[Quintessential] bg-white overflow-hidden">
      {/* Left Side - Krishna Image */}
      <motion.div
        initial={{ y: +20 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 50 }}
        className="hidden md:block w-1/2 h-screen bg-no-repeat bg-center bg-contain"
        style={{ backgroundImage: `url('/folklife.jpg')` }}
      ></motion.div>

      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 h-screen flex items-center justify-center relative overflow-hidden">
        {/* Glow particles */}

        <div className="z-10 bg-white/60 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-md mx-4 border-2 border-yellow-200">
          <motion.h2
            initial={{ y: +20 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 50 }}
            className="text-5xl text-center text-purple-800 drop-shadow-lg font-bold mb-2"
          >
            Hare Krishna 🙏
          </motion.h2>
          <motion.p
            initial={{ y: +20 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 50 }}
            className="text-center text-lg text-purple-700 italic mb-4"
          >
            Enter into the realm of Bhakti
          </motion.p>

          <motion.form
            initial={{ y: +20 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 50 }}
            className="space-y-4"
            onSubmit={handleLogin}
          >
            <div>
              <label className="text-md text-purple-800">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full mt-1 px-4 py-2 rounded-xl bg-white/80 text-purple-900 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="text-md text-purple-800">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full mt-1 px-4 py-2 rounded-xl bg-white/80 text-purple-900 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            <div className="text-right text-sm mt-2 text-purple-700 hover:underline">
              <a href="/signup">Forgot password?</a>
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold py-2 mt-4 rounded-xl transition duration-300 shadow-lg"
            >
              🌸 Begin Bhakti
            </motion.button>
          </motion.form>

          <motion.p
            className="text-center text-sm text-purple-800 mt-4"
            initial={{ y: +20 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 50 }}
          >
            Don't have an account?{" "}
            <a
              href="/signup"
              className="underline hover:text-purple-900 cursor-pointer"
            >
              Sign up
            </a>
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default Login;

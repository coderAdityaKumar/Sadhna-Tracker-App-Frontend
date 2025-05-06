import { useState,useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import {
  EnvelopeIcon,
  LockClosedIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

const login = () => {
  const baseURL = import.meta.env.VITE_BACKEND_URL;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      console.log("redirecting")
      // Optionally verify token with backend
      window.location.href = "https://sadhna-tracker-app-frontend.vercel.app";
      // window.location.href="http://localhost:5173"; // or replace with your actual home route
    }
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { email, password } = formData;
      const { data } = await axios.post(
        `${baseURL}/auth/login-user`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      if (data.success) {
        localStorage.setItem("jwt", data.data.token);
        toast.success("Login successfully!");
        window.location.href = "https://sadhna-tracker-app-frontend.vercel.app";
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error.data?.message || "Login failed.Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header with Logo */}
        <div className="text-center mb-8">
          {/* Logo Container with Sacred Geometry */}
          <div className=" mx-auto mb-4">
            <div className=" h-24 w-24 mx-auto flex items-center justify-center">
              {/* Replace this div with your actual logo */}
              <img
                src="/loginfolklogo.svg"
                alt="Handigram Folk Logo"
                className="h-28 w-28 object-cover"
              />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-purple-800 mb-1 font-serif">
            Nandgram Folk
          </h1>
          <h2 className="text-xl text-purple-600 mb-2 font-serif">
            Hare Krishna !
          </h2>
          <p className="text-gray-600 italic">Enter into the realm of Bhakti</p>
        </div>

        {/* Form Container */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg overflow-hidden p-8 space-y-6 border border-purple-100 relative"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400"></div>

          {/* Email */}
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                required
                className={`block w-full pl-10 pr-3 py-3 border border-gray-300
                rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <a
                href="/forgot-password"
                className="text-sm font-medium text-purple-600 hover:text-purple-500"
              >
                Forgot password?
              </a>
            </div>
            <div className="relative mt-1 rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockClosedIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                id="password"
                name="password"
                required
                className={`block w-full pl-10 pr-3 py-3 border border-gray-300
                 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white 
    ${
      loading
        ? "bg-purple-400 cursor-not-allowed"
        : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
    }
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 group`}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
            ) : (
              <>
                <span className="group-hover:scale-105 transition-transform">
                  Sign In
                </span>
                <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="font-medium text-purple-600 hover:text-purple-500 hover:underline"
            >
              Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
export default login;

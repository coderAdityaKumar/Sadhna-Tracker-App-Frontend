import { useState } from "react";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const baseURL = import.meta.env.VITE_BACKEND_URL;
  const navigateTo = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    hostel: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const {username,firstName,lastName,email,hostel,password}=formData
      const { data } = await axios.post(
        `${baseURL}/auth/register-user`,
        {
          username,
          firstName,
          lastName,
          email,
          password,
          hostel,
        },
        {
          withCredentials: true, // Include cookies
          headers: {
            "Content-Type": "application/json", // Tell server it’s JSON
          },
        }
      );
      if (data.success) {
        toast.success(data.message || "user registered successfully");
        navigateTo("/login");
      } else {
        toast.error(data.message || "User registration failed");
      }
    } catch (error) {
      console.log(error);
      console.error("Error Response:", error.response);
      const errorMessage =
        error.response?.data?.message || "user registration failed";
      toast.error(errorMessage);
    }finally {
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
            Hare Krishna!
          </h2>
          <p className="text-gray-600 italic">Join the devotional family</p>
        </div>

        {/* Form Container */}
        <form action="" onSubmit={handleRegister}>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-8 space-y-6 border border-purple-100 relative">
            {/* Sacred Border Decoration */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400"></div>

            {/* Username */}
            <div className="space-y-1">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-1">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Hostel Select */}
            <div className="space-y-1">
              <label
                htmlFor="hostel"
                className="block text-sm font-medium text-gray-700"
              >
                Select your Hostel
              </label>
              <div className="relative mt-1">
                <select
                  id="hostel"
                  name="hostel"
                  required
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 pr-10 bg-white"
                  value={formData.hostel}
                  onChange={handleChange}
                >
                  <option value="">-- Choose an option --</option>
                  <option value="Chaitanya Niwas">Chaitanya Niwas</option>
                  <option value="Nityananda Niwas">Nityananda Niwas</option>
                  <option value="Govinda Niwas">Govinda Niwas</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

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
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 bg-white text-sm text-gray-500 font-serif">
                  Begin Bhakti
                </span>
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
                  Create Account
                </span>
                
              </>
            )}
          </button>

            {/* Login Link */}
            <div className="text-center text-sm text-gray-600">
              Already registered?{" "}
              <a
                href="/login"
                className="font-medium text-purple-600 hover:text-purple-500 hover:underline"
              >
                Log in
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Signup;

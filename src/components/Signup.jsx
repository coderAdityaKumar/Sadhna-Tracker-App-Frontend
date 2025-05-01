import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // For tick and cross icons

const Signup = () => {
  const [username, setUsername] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(null);
  const [usernameError, setUsernameError] = useState("");

  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(null);
  const [passwordError, setPasswordError] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [hostel, setHostel] = useState("");

  const navigateTo = useNavigate();

  // Username validation function
  const validateUsername = (value) => {
    const regex = /^[A-Za-z0-9_]+$/; // only letters, numbers, underscores
    if (value.length < 3 || value.length > 30) {
      setUsernameError("Username must be between 3 and 30 characters.");
      return false;
    } else if (!regex.test(value)) {
      setUsernameError(
        "Username can only contain letters, numbers, and underscores."
      );
      return false;
    } else {
      setUsernameError("");
      return true;
    }
  };

  // Password validation function
  const validatePassword = (value) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    if (!regex.test(value)) {
      setPasswordError(
        "Password must be at least 6 characters long, contain uppercase, lowercase, number, and special character."
      );
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    if (value === "") {
      setIsUsernameValid(null);
    } else {
      setIsUsernameValid(validateUsername(value));
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value === "") {
      setIsPasswordValid(null);
    } else {
      setIsPasswordValid(validatePassword(value));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const usernameOkay = validateUsername(username);
    const passwordOkay = validatePassword(password);

    if (!usernameOkay || !passwordOkay) {
      toast.error("Please fix validation errors before submitting.");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:3000/auth/register-user",
        {
          username,
          firstName,
          lastName,
          email,
          password,
          hostel,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Backend Response:", data);

      // Here, CHECK if backend says success
      if (data.success) {
        toast.success(data.message || "User registered successfully");
        navigateTo("/login");

        // Reset form
        setUsername("");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setHostel("");
        setIsUsernameValid(null);
        setIsPasswordValid(null);
      } else {
        // If backend sends success: false
        toast.error(data.message || "User registration failed");
      }
    } catch (error) {
      console.error("Error Response:", error.response);
      const errorMessage =
        error.response?.data?.message || "User registration failed";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side */}
      <div
        className="hidden md:block w-1/2 h-screen"
        style={{
          backgroundImage: `url('/folklife.jpg')`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 h-screen flex items-center justify-center bg-white relative">
        <div className="z-10 bg-white/60 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-full max-w-md mx-4 font-Quintessential">
          <h2 className="text-4xl font-bold text-center text-purple-800 drop-shadow-md">
            Hare Krishna!
          </h2>
          <p className="text-center text-purple-700 italic mb-6 text-2xl">
            Join the devotional family
          </p>
          <form className="space-y-4" onSubmit={handleRegister}>
            {/* Username */}
            <div>
              <label className="text-md text-purple-800">Username</label>
              <div className="relative">
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder="Enter your username"
                  className="w-full mt-1 px-4 py-2 pr-10 rounded-xl bg-white/80 text-purple-900 placeholder-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                {isUsernameValid !== null && (
                  <span className="absolute right-3 top-3">
                    {isUsernameValid ? (
                      <FaCheckCircle className="text-green-500" size={20} />
                    ) : (
                      <FaTimesCircle className="text-red-500" size={20} />
                    )}
                  </span>
                )}
              </div>
              {usernameError && (
                <p className="text-red-500 text-sm mt-1">{usernameError}</p>
              )}
            </div>

            {/* Firstname and Lastname */}
            <div className="flex gap-2">
              <div className="w-1/2">
                <label className="text-md text-purple-800">First Name</label>
                <input
                  type="text"
                  name="firstname"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter your first name"
                  className="w-full mt-1 px-4 py-2 rounded-xl bg-white/80 text-purple-900 placeholder-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
              <div className="w-1/2">
                <label className="text-md text-purple-800">Last Name</label>
                <input
                  type="text"
                  name="lastname"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter your last name"
                  className="w-full mt-1 px-4 py-2 rounded-xl bg-white/80 text-purple-900 placeholder-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
            </div>

            {/* Hostel Selector */}
            <div className="flex flex-col space-y-2">
              <h3 className="text-purple-800">Select your Hostel</h3>
              <select
                value={hostel}
                onChange={(e) => setHostel(e.target.value)}
                className="font-mono w-full focus:outline-none border border-purple-400 p-2 rounded-xl"
              >
                <option value="">-- Choose an option --</option>
                <option value="Chaitanya Niwas">Chaitanya Niwas</option>
                <option value="Nityananda Niwas">Nityananda Niwas</option>
                <option value="Govinda Niwas">Govinda Niwas</option>
              </select>
            </div>

            {/* Email and Password */}
            <div>
              <label className="text-md text-purple-800">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full mt-1 px-4 py-2 rounded-xl bg-white/80 text-purple-900 placeholder-purple-500 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
            {/* Password */}
            <div>
              <label className="text-md text-purple-800">Password</label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter your password"
                  className="w-full mt-1 px-4 py-2 pr-10 rounded-xl bg-white/80 text-purple-900 placeholder-purple-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                {isPasswordValid !== null && (
                  <span className="absolute right-3 top-3">
                    {isPasswordValid ? (
                      <FaCheckCircle className="text-green-500" size={20} />
                    ) : (
                      <FaTimesCircle className="text-red-500" size={20} />
                    )}
                  </span>
                )}
              </div>
              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold py-2 mt-4 rounded-xl transition duration-300 shadow-lg"
            >
              Begin Bhakti
            </button>
          </form>
          <p className="text-center text-sm text-purple-800 mt-4">
            Already registered?{" "}
            <span className="underline hover:text-purple-900 cursor-pointer">
              <a href="/login">Log in</a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

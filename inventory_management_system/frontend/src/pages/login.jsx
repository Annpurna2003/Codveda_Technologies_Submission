import React, { useState, useContext } from "react";
import { AppContext } from "../context/appcontext";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { FaEye, FaEyeSlash } from "react-icons/fa"; // 👁️ icons added

const Login = () => {
  const { handleLogin } = useContext(AppContext);
  const [userFormData, setUserFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    handleLogin(userFormData.email, userFormData.password, userFormData.role);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#140746] to-[#2c065d] p-4">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-extrabold mb-8 text-gray-800 text-center">
          Sign In
        </h2>

        <form className="space-y-6" onSubmit={handleSignIn}>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={userFormData.email}
              onChange={handleChange}
              name="email"
              placeholder="Enter your email"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#140746] transition"
              required
            />
          </div>

          {/* Password with eye toggle */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={userFormData.password}
              onChange={handleChange}
              name="password"
              placeholder="Enter your password"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#140746] transition pr-10"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-[46px] cursor-pointer text-gray-500"
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </span>
          </div>

          {/* Role Selection */}
          <div>
            <label
              htmlFor="role"
              className="block text-gray-700 font-semibold mb-2"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              value={userFormData.role}
              onChange={handleChange}
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#140746] transition"
              required
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Purchase Officer">Purchase Officer</option>
              <option value="Store Keeper">Store Keeper</option>
              <option value="Department User">Department User</option>
              <option value="Manager">Manager</option>
            </select>
          </div>

          {/* Error message */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#140746] text-white py-3 rounded-xl font-semibold hover:bg-[#2c065d] transition duration-300"
          >
            Sign In
          </button>
        </form>


        {/* Navigate to Register */}
        <p className="mt-6 text-sm text-center text-gray-500">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-[#140746] font-semibold underline cursor-pointer hover:text-[#2c065d] transition"
          >
            Create Account
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;

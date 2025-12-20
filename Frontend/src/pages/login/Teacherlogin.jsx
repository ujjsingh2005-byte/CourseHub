import React from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

export default function TeacherLogin() {
  const [EmailId, setEmail] = React.useState("");
  const [Password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = { EmailId,Password };
      const response = await axios.post("/api/Teacherlogin", formData);

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        navigate("/Teacher");
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (error) {
      alert("Wrong email or password");
      console.error(error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-100 via-purple-50 to-white h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-2 mb-3">
            
            <h1 className="text-3xl font-bold text-purple-600">
              CourseHub
            </h1>
          </div>
          <p className="text-gray-600 text-sm">Teacher Login</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            Sign In
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={EmailId}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Button */}
            <div className="mt-6 flex justify-center">
              <button
                type="submit"
                className="px-12 py-3 rounded-lg font-semibold text-white bg-purple-600 hover:bg-purple-700 shadow-md hover:shadow-lg transition-all duration-200"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

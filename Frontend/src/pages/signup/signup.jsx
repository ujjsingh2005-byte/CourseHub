import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter your full name");
      return;
    }

    if (!email.endsWith("@gmail.com")) {
      alert("Email must end with @gmail.com");
      return;
    }

    if (!password.trim()) {
      alert("Please enter a password");
      return;
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(mobile)) {
      alert("Mobile number must be exactly 10 digits");
      return;
    }

    if (!gender) {
      alert("Please select your gender");
      return;
    }

    const formData = {
      Name: name,
      EmailId: email,
      Password: password,
      Mobile: mobile,
      Gender: gender,
    };

    try {
      const response = await axios.post("/api/Signup", formData);


      if(response.data.success){
        console.log('User created:', response.data);
        alert("Verify the email.");
        navigate('/verify',{ state: { EmailId: formData.EmailId } });
     }else{
       alert(response.data.message);
       window.location.reload();
     }
    
    } catch (err) {
      console.error("Error creating student:", err.message);
      alert("Error creating student. Please try again.",err.message);
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-100 via-purple-50 to-white min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-gradient-to-br from-green-200 via-green-150 to-white rounded-2xl shadow-2xl p-8">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Course<span className="text-purple-600">Hub</span>
          </h1>
          <p className="text-gray-600">Student Registration Portal</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 rounded-xl border border-green-300 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none shadow-sm hover:shadow-md transition"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email (must end with @gmail.com)"
              className="w-full px-4 py-3 rounded-xl border border-green-300 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none shadow-sm hover:shadow-md transition"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="w-full px-4 py-3 rounded-xl border border-green-300 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none shadow-sm hover:shadow-md transition"
              required
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <input
              type="phone"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="10-digit mobile number"
              className="w-full px-4 py-3 rounded-xl border border-green-300 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none shadow-sm hover:shadow-md transition"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-green-300 text-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none shadow-sm hover:shadow-md transition"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-purple-600 text-white font-semibold text-lg rounded-xl shadow-md hover:bg-purple-700 hover:shadow-xl transition transform hover:scale-105"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <div className="mt-4 text-center text-gray-700 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-purple-600 font-semibold cursor-pointer hover:underline"
          >
            Sign In
          </span>
        </div>
      </div>
    </div>
  );
}

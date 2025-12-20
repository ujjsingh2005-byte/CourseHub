import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Studentlogin() {

    const [EmailId,setEmail] = React.useState('');
    const [Password,setPassword] = React.useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent page reload

        try {
          const formData = { EmailId, Password };
          const response = await axios.post("/api/StudentLogin",formData);

          if (response.data.success) {
           
            localStorage.setItem("token", response.data.token);
            navigate("/StudentDashboard");
          } else {
            alert(response.data.message);
          }
        }  catch (error) {
            // Better error handling
            const errorMessage = error.response?.data?.message || error.message || "Something went wrong";
            alert(errorMessage);
            console.error("Login error:", error);
          }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-50 to-white p-6 flex items-center justify-center">
            <div className="w-full max-w-md bg-gradient-to-br from-green-200 via-green-150 to-white rounded-2xl shadow-2xl p-10">
                
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">
                        CourseHub
                    </h1>
                    <p className="text-gray-600 mt-2 text-lg">Student Login Portal</p>
                </div>

                {/* Login Form */}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                        <input
                            type="EmailId"
                            id="EmailId"
                            name="EmailId" 
                            value={EmailId}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            className="w-full px-5 py-4 text-lg rounded-2xl border border-green-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-300 shadow-sm hover:shadow-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                        <input
                            type="Password"
                            id="Password"
                            name="Password"
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                            className="w-full px-5 py-4 text-lg rounded-2xl border border-green-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-300 shadow-sm hover:shadow-md"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white font-semibold py-4 text-lg rounded-2xl shadow-md hover:bg-purple-700 hover:shadow-xl transition-all transform hover:scale-105"
                    >
                        Sign In
                    </button>
                </form>

                {/* Footer Links */}
                <p className="text-center text-gray-700 mt-6 text-sm">
                    Are you a member of organization?{" "}
                    <a href="/Teacherlogin" className="text-purple-600 font-semibold hover:underline">Teacher</a> /{" "}
                    <a href="/Adminlogin" className="text-purple-600 font-semibold hover:underline">Admin</a>
                </p>
            </div>
        </div>
    )
}

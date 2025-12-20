import React from 'react';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Success() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex items-center justify-center bg-green-100 relative overflow-hidden">
      
      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-6 h-6 bg-green-300/50 rounded-full animate-ping"></div>
      <div className="absolute bottom-20 right-16 w-10 h-10 bg-green-400/40 rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 right-24 w-5 h-5 bg-green-500/50 rounded-full animate-bounce"></div>

      {/* Success Card */}
      <div className="bg-white rounded-3xl shadow-xl p-12 max-w-md w-full text-center transform transition-all duration-500 hover:scale-105">
        
        {/* Check Icon */}
        <div className="mx-auto w-20 h-20 rounded-full flex items-center justify-center bg-green-200 mb-6 shadow-md">
          <Check className="w-12 h-12 text-green-600 animate-bounce" />
        </div>

        {/* Message */}
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Registration Successful!</h2>
        <p className="text-gray-600 mb-6">
          Your account has been created successfully. You can now login to start your learning journey.
        </p>

        <button
          onClick={() => navigate('/login')}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
        >
          Login
        </button>

        {/* Footer */}
        <p className="text-gray-400 mt-8 text-sm">Welcome to CourseHub</p>
      </div>
    </div>
  );
}

export default Success;

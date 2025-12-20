import React, { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export default function Verify() {
  const navigate = useNavigate();
  const location = useLocation();
  const inputRefs = useRef([]); // For OTP auto-focus handling

  const {
    
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: { pin: "" },
  });

  // 🔹 Move focus to next box automatically
  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // allow only digits
    e.target.value = value;

    const currentPin = getValues("pin").split("");
    currentPin[index] = value;
    setValue("pin", currentPin.join(""));

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const onSubmit = async (data) => {
    try {
      const EmailId = location.state?.EmailId;
      const payload = { ...data, EmailId };
      console.log("Payload:", payload);
      const response = await axios.post("/api/verify", payload);

      if (response.data.success) {
        navigate("/success");
      } else {
        alert("Wrong OTP. Please sign up again.");
        navigate("/Signup");
      }
      alert(response.data.message);
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("An error occurred during verification.");
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-green-400 via-emerald-500 to-green-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-black/30 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/10 p-8 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">CourseHub</h1>
        <p className="text-gray-300 mb-6">
          Enter the 6-digit code sent to your email
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* OTP Input */}
          <div className="flex justify-center gap-3">
            {[...Array(6)].map((_, i) => (
              <input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                maxLength={1}
                onChange={(e) => handleChange(e, i)}
                className="w-12 h-12 border-2 border-white/20 rounded-lg text-lg font-semibold text-white bg-black/20 focus:border-green-400 focus:ring-2 focus:ring-green-400/50 text-center outline-none transition-all duration-200"
              />
            ))}
          </div>

          {errors.pin && (
            <p className="text-red-500 text-sm mt-2">{errors.pin.message}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
          >
            Verify & Continue
          </button>
        </form>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import CourseCard from "../../components/CourseCard";
import { toast } from "react-toastify";
const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("your");
  const [courses, setCourses] = useState([]);
  const [enrolledCourseCodes, setEnrolledCourseCodes] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  let studentId;
  if (token) {
    const decoded = jwtDecode(token);
    studentId = decoded.id || decoded._id;
  }

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const res = await axios.get("/api/allCourses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchEnrolledCourses = async () => {
      try {
        const res = await axios.get(
          `/api/${studentId}/courses`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEnrolledCourseCodes(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchAllCourses(), fetchEnrolledCourses()]);
      setLoading(false);
    };

    if (studentId) loadData();
  }, [token, studentId]);


  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
  const handleBuyCourse = async (course) => {
  try {
    setLoading(true);

    // 1️⃣ Create order (NO amount sent)
    const orderRes = await axios.post(
      "http://localhost:3000/api/createOrder",
      {
        courseId: course.Courseid,
        studentId: studentId,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const { order } = orderRes.data;

    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded");
      return;
    }

    // 2️⃣ Razorpay options
    const options = {
      key: "rzp_test_RS1oDBHgTYzaZX",
      amount: order.amount,
      currency: order.currency,
      order_id: order.id,
      name: "CourseHub",
      description: `Payment for ${course.CourseName}`,
      theme: { color: "#16a34a" },

      
      handler: async function (response) {
        try {
          await axios.post(
            "/api/verifyPayment",
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              courseId: course.Courseid,
              studentId: studentId,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          // 4️⃣ Enroll course
          await axios.post(
            `/api/${studentId}/enroll/${course.Courseid}`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
          );

          toast.success("Payment successful & course enrolled!");
          setEnrolledCourseCodes((prev) => [...prev, course.Courseid]);

        } catch (err) {
          console.error("Verification error:", err);
          toast.error("Payment verification failed");
        }
      },

      modal: {
        ondismiss: () => toast.info("Payment cancelled"),
      },
    };

    new window.Razorpay(options).open();
  } catch (err) {
    console.error("Payment error:", err);
    toast.error("Failed to initiate payment");
  } finally {
    setLoading(false);
  }
};


  const displayedCourses =
    activeTab === "your"
      ? courses.filter((c) => enrolledCourseCodes.includes(c.Courseid))
      : courses;

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-50 to-white flex justify-center items-start p-6">
      <div className="w-full max-w-6xl bg-white shadow-xl rounded-2xl p-6">
        {/* Tabs */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setActiveTab("your")}
            className={`px-6 py-2 rounded-t-xl font-semibold transition ${
              activeTab === "your"
                ? "bg-green-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Your Courses
          </button>
          <button
            onClick={() => setActiveTab("all")}
            className={`px-6 py-2 rounded-t-xl font-semibold transition ${
              activeTab === "all"
                ? "bg-green-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            All Courses
          </button>
        </div>

        {/* Courses */}
        {displayedCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedCourses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                role="student"
                isPurchased={enrolledCourseCodes.includes(course.Courseid)}
                onBuy={() => handleBuyCourse(course)}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-6">
            {activeTab === "your"
              ? "You haven't enrolled in any courses yet."
              : "No courses available."}
          </p>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;

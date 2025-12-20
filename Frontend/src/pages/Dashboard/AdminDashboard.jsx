import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CourseCard from "../../components/CourseCard";

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/allCourses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(res.data);
      } catch (error) {
        console.error("Error fetching courses:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleDeleteCourse = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`/api/deleteCourse/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses((prev) => prev.filter((course) => course._id !== id));
        alert("Course deleted successfully!");
      } catch (error) {
        console.error("Error deleting course:", error.message);
        alert("Failed to delete course. Please try again.");
      }
    }
  };

  if (loading) {
    return <p className="text-center text-gray-600 mt-10">Loading courses...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-50 to-white p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">All Courses</h2>
          <button
            onClick={() => navigate("/AddCourse")}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            + Add New Course
          </button>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.length > 0 ? (
            courses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                role="admin"
                onDelete={() => handleDeleteCourse(course._id)}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              No courses available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

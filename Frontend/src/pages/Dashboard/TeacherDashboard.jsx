import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "../../components/CourseCard";

const TeacherDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token"); 
        const res = await axios.get("/api/allCourses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(res.data);
      } catch (error) {
        console.error(" Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600 mt-10">Loading courses...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-50 to-white p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">All Courses</h2>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.length > 0 ? (
            courses.map((course) => (
              <CourseCard key={course._id} course={course} role="teacher" />
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

export default TeacherDashboard;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import axios from "axios";

const SubjectDashboard = () => {
  const { courseId } = useParams(); // get courseId from URL
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(
          `/api/courses/${courseId}`
        );
        const data = res.data;

        // Ensure consistent field names
        const formattedCourse = {
          CourseName: data.CourseName ,
          Description: data.Description ,
          Subjects: Array.isArray(data.Subjects)
            ? data.Subjects.map((s) => ({
                id: s.id || s._id,
                SubjectName: s.SubjectName ,
                TeacherName: s.TeacherName ,
              }))
            : [],
        };

        setCourse(formattedCourse);
      } catch (err) {
        console.error("Error fetching course:", err);
        setError("Failed to load course data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (loading) return <p className="text-center mt-10">Loading course details...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!course) return <p className="text-center mt-10">Course not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 ">
      <div className="bg-gradient-to-br from-green-100 via-green-50 to-white rounded-2xl shadow-lg p-6 border border-gray-200">
      {/* Course Title */}
      <h1 className="text-3xl font-bold mb-4">{course.CourseName}</h1>

      {/* Course Description */}
      <p className="text-gray-700 mb-6">{course.Description}</p>

      {/* Subjects */}
      <h2 className="text-2xl font-semibold mb-3">Subjects in this course</h2>
      <div className="space-y-4">
        {course.Subjects.length > 0 ? (
          course.Subjects.map((subject) => (
            <div
              key={subject.id}
              onClick={() => navigate(`/lecture/${courseId}/${subject.id}`)} // dynamic lecture path
              className="p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition flex justify-between items-center cursor-pointer"
            >
              <div>
                <h3 className="text-lg font-semibold">{subject.SubjectName}</h3>
                <p className="text-gray-600">Teacher: {subject.TeacherName}</p>
              </div>
              <ChevronRight className="text-gray-500 w-6 h-6" />
            </div>
          ))
        ) : (
          <p>No subjects available for this course.</p>
        )}
      </div>
    </div></div>
  );
};

export default SubjectDashboard;

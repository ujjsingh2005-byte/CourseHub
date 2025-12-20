import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const CourseUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token"); 

  const [course, setCourse] = useState({
    CourseName: "",
    Description: "",
    Price: "",
    Subjects: [],
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(
          `/api/courses/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = res.data;
        if (!Array.isArray(data.Subjects)) data.Subjects = [];
        setCourse(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching course:", err);
        setError("Failed to load course data.");
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, token]);

 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };


  const handleSubjectChange = (index, field, value) => {
    const updatedSubjects = [...course.Subjects];
    updatedSubjects[index][field] = value;
    setCourse({ ...course, Subjects: updatedSubjects });
  };


  const handleAddSubject = () => {
    const newSubject = {
      id: Date.now(),
      SubjectName: "",
      Code: "",
      TeacherName: "",
    };
    setCourse({ ...course, Subjects: [...course.Subjects, newSubject] });
  };


  const handleDeleteSubject = async (subjectName) => {
    try {
      await axios.post(
        "/api/DelSubject",
        {
          courseId: id,
          subjectName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      setCourse({
        ...course,
        Subjects: course.Subjects.filter(
          (sub) => sub.SubjectName !== subjectName
        ),
      });

      alert("Subject deleted successfully!");
    } catch (err) {
      console.error("Failed to delete subject:", err);
      alert("Failed to delete subject");
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await axios.put(
        `/api/courses/${id}`,
        course,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ VERIFY TOKEN
          },
        }
      );

      alert("Course updated successfully!");
      navigate("/adminDashboard");
    } catch (err) {
      console.error("Error saving course:", err);
      alert("Failed to update course.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading course data...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-3xl font-bold mb-6">Update Course</h1>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Course Title</label>
        <input
          type="text"
          name="CourseName"
          value={course.CourseName}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg mt-1"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium">
          Course Description
        </label>
        <textarea
          name="Description"
          value={course.Description}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg mt-1"
          rows="3"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Price</label>
        <input
          type="number"
          name="Price"
          value={course.Price}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg mt-1"
        />
      </div>

      <h2 className="text-xl font-semibold mb-3">Subjects</h2>

      {course.Subjects.map((subject, index) => (
        <div
          key={subject.id || index}
          className="p-4 border rounded-lg mb-3 flex flex-col md:flex-row gap-4 items-center"
        >
          <div className="flex-1">
            <label className="block text-gray-700 font-medium">
              Subject Name
            </label>
            <input
              type="text"
              value={subject.SubjectName}
              onChange={(e) =>
                handleSubjectChange(index, "SubjectName", e.target.value)
              }
              className="w-full p-2 border rounded-lg mt-1"
            />
          </div>

          <div className="flex-1">
            <label className="block text-gray-700 font-medium">
              Subject Code
            </label>
            <input
              type="text"
              value={subject.Code}
              onChange={(e) =>
                handleSubjectChange(index, "Code", e.target.value)
              }
              className="w-full p-2 border rounded-lg mt-1"
            />
          </div>

          <div className="flex-1">
            <label className="block text-gray-700 font-medium">
              Teacher Name
            </label>
            <input
              type="text"
              value={subject.TeacherName}
              onChange={(e) =>
                handleSubjectChange(index, "TeacherName", e.target.value)
              }
              className="w-full p-2 border rounded-lg mt-1"
            />
          </div>

          <button
            onClick={() => handleDeleteSubject(subject.SubjectName)}
            className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      ))}

      <button
        onClick={handleAddSubject}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mt-2"
      >
        + Add Subject
      </button>

      <div className="mt-6">
        <button
          onClick={handleSave}
          disabled={saving}
          className={`${
            saving ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
          } text-white px-6 py-2 rounded-lg`}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default CourseUpdate;

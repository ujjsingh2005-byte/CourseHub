import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {
  const navigate = useNavigate();

  const [course, setCourse] = useState({
    Courseid: "",
    CourseName: "",
    Description: "",
    Price: "",
    Subjects: [],
    Thumbnail: null, 
  });

  const [saving, setSaving] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  // Handle subject change
  const handleSubjectChange = (index, field, value) => {
    const updatedSubjects = [...course.Subjects];
    updatedSubjects[index][field] = value;
    setCourse({ ...course, Subjects: updatedSubjects });
  };

  // Add subject
  const handleAddSubject = () => {
    setCourse({
      ...course,
      Subjects: [
        ...course.Subjects,
        { SubjectName: "", SubjectCode: "", TeacherName: "" },
      ],
    });
  };

  // Delete subject
  const handleDeleteSubject = (index) => {
    setCourse({
      ...course,
      Subjects: course.Subjects.filter((_, i) => i !== index),
    });
  };

  // Handle image upload
  const handleFileChange = (e) => {
    setCourse({ ...course, Thumbnail: e.target.files[0] });
  };

  // Save course
  const handleSave = async () => {
    try {
      setSaving(true);

      const formData = new FormData();
      formData.append("Courseid", course.Courseid);
      formData.append("CourseName", course.CourseName);
      formData.append("Description", course.Description);
      formData.append("Price", course.Price);
      formData.append("Thumbnail", course.Thumbnail);
      formData.append("Subjects", JSON.stringify(course.Subjects));

      const token = localStorage.getItem("token");
     
await axios.post(
  "/api/AddCourse",
  formData,
  {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    }
  }
);


      alert("Course added successfully!");
      navigate("/adminDashboard");
    } catch (err) {
      console.error("Error adding course:", err);
      alert(" Failed to add course");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h1 className="text-3xl font-bold mb-6">Add New Course</h1>

      {/* Course ID */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Course ID</label>
        <input
          type="text"
          name="Courseid"
          value={course.Courseid}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg mt-1"
        />
      </div>

      {/* Course Name */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Course Name</label>
        <input
          type="text"
          name="CourseName"
          value={course.CourseName}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg mt-1"
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Description</label>
        <textarea
          name="Description"
          value={course.Description}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg mt-1"
          rows="3"
        />
      </div>

      {/* Price */}
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

      {/* Course Thumbnail */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium">
          Course Thumbnail
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 border rounded-lg mt-1"
        />
      </div>

      {/* Subjects */}
      <h2 className="text-xl font-semibold mb-3">Subjects</h2>

      {course.Subjects.map((subject, index) => (
        <div
          key={index}
          className="p-4 border rounded-lg mb-3 flex flex-col md:flex-row gap-4 items-center"
        >
          <input
            type="text"
            placeholder="Subject Name"
            value={subject.SubjectName}
            onChange={(e) =>
              handleSubjectChange(index, "SubjectName", e.target.value)
            }
            className="w-full p-2 border rounded-lg"
          />

          <input
            type="text"
            placeholder="Subject Code"
            value={subject.SubjectCode}
            onChange={(e) =>
              handleSubjectChange(index, "SubjectCode", e.target.value)
            }
            className="w-full p-2 border rounded-lg"
          />

          <input
            type="text"
            placeholder="Teacher Name"
            value={subject.TeacherName}
            onChange={(e) =>
              handleSubjectChange(index, "TeacherName", e.target.value)
            }
            className="w-full p-2 border rounded-lg"
          />

          <button
            onClick={() => handleDeleteSubject(index)}
            className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      ))}

      {/* Add Subject */}
      <button
        onClick={handleAddSubject}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mt-2"
      >
        + Add Subject
      </button>

      {/* Save */}
      <div className="mt-6">
        <button
          onClick={handleSave}
          disabled={saving}
          className={`${
            saving ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
          } text-white px-6 py-2 rounded-lg`}
        >
          {saving ? "Saving..." : "Save Course"}
        </button>
      </div>
    </div>
  );
};

export default AddCourse;

import React, { useState } from "react";
import axios from "axios";

const UploadLecture = () => {
  const [courseId, setCourseId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [lectureNo, setLectureNo] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [video, setVideo] = useState(null);
  const [notes, setNotes] = useState(null);
  const [dpp, setDpp] = useState(null);

  const [lectureId, setLectureId] = useState(null); // ✅ IMPORTANT

  const uploadLectureVideo = async () => {
    if (!courseId || !subjectId || !lectureNo || !video) {
      alert("All fields and video are required");
      return;
    }

    const formData = new FormData();
   formData.append("video", video); // lowercase, matches multer middleware
formData.append("title", title);
formData.append("LectureNo", lectureNo); // matches backend
formData.append("Description", description); // matches backend
formData.append("course", courseId);
formData.append("subject", subjectId);


    try {
      const res = await axios.post(
        "/api/upload-lecture",
        formData
      );

      alert("Lecture video uploaded successfully");

      
      setLectureId(res.data.lecture._id);
      console.log("Lecture ID:", res.data.lecture._id);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Video upload failed");
    }
  };

 
  const uploadMaterial = async (type, file) => {
    if (!lectureId || !file) {
      alert("Upload lecture video first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("lectureId", lectureId);
    formData.append("type", type); // Notes | DPP

    try {
      const res = await axios.post(
        "/api/upload-material",
        formData
      );

      alert(`${type} uploaded successfully`);
      console.log(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(`${type} upload failed`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="bg-white p-6 rounded-xl w-full max-w-3xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Upload Lecture & Materials
        </h2>

        {/* Course & Subject */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            placeholder="Course ID"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            placeholder="Subject ID"
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        {/* Lecture Info */}
        <input
          placeholder="Lecture Number"
          value={lectureNo}
          onChange={(e) => setLectureNo(e.target.value)}
          className="border p-2 rounded w-full mb-3"
        />

        <input
          placeholder="Lecture Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded w-full mb-3"
        />

        <textarea
          placeholder="Lecture Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        />

        {/* Upload Video */}
        <div className="border p-3 rounded mb-4">
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
          />
          <button
            onClick={uploadLectureVideo}
            className="bg-green-600 text-white px-4 py-2 rounded ml-4"
          >
            Upload Lecture Video
          </button>
        </div>

        {/* Upload Notes */}
        <div className="border p-3 rounded mb-4">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setNotes(e.target.files[0])}
          />
          <button
            onClick={() => uploadMaterial("Notes", notes)}
            className="bg-indigo-600 text-white px-4 py-2 rounded ml-4"
          >
            Upload Notes
          </button>
        </div>

        {/* Upload DPP */}
        <div className="border p-3 rounded">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setDpp(e.target.files[0])}
          />
          <button
            onClick={() => uploadMaterial("DPP", dpp)}
            className="bg-orange-600 text-white px-4 py-2 rounded ml-4"
          >
            Upload DPP
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadLecture;

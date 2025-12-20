import React, { useEffect, useState } from "react";
import axios from "axios";

const LecturePage = ({ courseId, enrolled }) => {
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/lectures/${courseId}`);
        // Map API data to ensure correct keys
        const formattedLectures = res.data.lectures.map((lec) => ({
          _id: lec._id,
          title: lec.title,
          Description: lec.Description,
          Video: lec.Video || null,
          Notes: lec.Notes?.url || null, // If stored as object with Cloudinary URL
          DPP: lec.DPP?.url || null,     // Same for DPP
        }));
        setLectures(formattedLectures);
      } catch (err) {
        console.error("Error fetching lectures:", err.response?.data || err.message);
      }
    };

    if (courseId) fetchLectures();
  }, [courseId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 via-green-150 to-white p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Course Lectures</h1>

        {lectures.length === 0 ? (
          <p>No lectures available yet.</p>
        ) : (
          lectures.map((lec) => (
            <div key={lec._id} className="border p-4 rounded-xl mb-4 shadow-md">
              <h2 className="text-lg font-semibold">{lec.title}</h2>
              <p className="text-gray-600 mb-2">{lec.Description}</p>

              {enrolled ? (
                <div className="space-y-2">
                  {lec.Video && (
                    <video controls className="w-full rounded-lg" src={lec.Video}></video>
                  )}
                  {lec.Notes && (
                    <a
                      href={lec.Notes}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      📘 Download Notes
                    </a>
                  )}
                  {lec.DPP && (
                    <a
                      href={lec.DPP}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-600 hover:underline"
                    >
                      📝 Download DPP
                    </a>
                  )}
                </div>
              ) : (
                <p className="text-red-500 italic">Enroll to access materials.</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LecturePage;

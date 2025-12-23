import React, { useEffect, useState } from "react";
import axios from "axios";

const LecturePage = ({ courseId, enrolled }) => {
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true); // loading state
  const [error, setError] = useState(null); // error state

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/lectures/${courseId}`);
       const fetchedLectures = Array.isArray(res.data)
          ? res.data
          : res.data.lectures || [];

        setLectures(fetchedLectures);
       
      } catch (err) {
        console.error("Error fetching lectures:", err);
        setError("Failed to load lectures. Please try again later.");
        setLoading(false);
      }
    };
    fetchLectures();
  }, [courseId]);

  if (loading) return <p className="text-center mt-10">Loading lectures...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 via-green-150 to-white p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Course Lectures</h1>

        {lectures.length === 0 ? (
          <p className="text-center text-gray-600">No lectures available yet.</p>
        ) : (
          lectures.map((lec) => (
            <div
              key={lec._id}
              className="border p-4 rounded-xl mb-6 shadow-md flex flex-col md:flex-row gap-4"
            >
              {/* Video Section */}
              <div className="flex-1">
                {lec.Video ? (
                  <video
                    controls
                    className="w-full rounded-lg shadow-md"
                    src={lec.Video}
                    preload="metadata"
                    onError={(e) => console.error("Video load error:", e)}
                    onLoadStart={() => console.log("Video load started")}
                    onCanPlay={() => console.log("Video can play")}
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <p className="text-gray-500 italic">Video not available</p>
                )}
              </div>

              {/* Details Section */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-bold mb-2">{lec.title || "Untitled Lecture"}</h2>
                  <p className="text-gray-700 mb-4">{lec.Description || "No description provided."}</p>
                </div>

                {enrolled ? (
                  <div className="flex flex-col gap-2">
                    {lec.Notes && (
                      <a
                        href={lec.Notes}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      >
                        📘 Download Notes
                      </a>
                    )}
                    {lec.DPP && (
                      <a
                        href={lec.DPP}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
                      >
                        📝 Download DPP
                      </a>
                    )}
                  </div>
                ) : (
                  <p className="text-red-500 italic">Enroll to access materials.</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LecturePage;

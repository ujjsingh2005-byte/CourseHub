import React from "react";
import { Link } from "react-router-dom";

export default function CourseCard({
  course,
  role,
  isPurchased,
  onBuy,
  onDelete,
}) {
  const imageUrl =
    course.Thumbnail ||
    "https://via.placeholder.com/300x200?text=No+Image";

  return (
    <div className="border p-4 rounded shadow">
      <img
        src={imageUrl}
        alt={course.CourseName}
        className="w-full h-32 object-cover rounded"
      />

      <h2 className="font-bold text-lg mt-2">{course.CourseName}</h2>
      <p className="text-sm text-gray-600">{course.Description}</p>

      {/* Student */}
      {role === "student" &&
        (isPurchased ? (
          <div className="mt-2 flex gap-2">
            <button className="bg-green-500 text-white px-2 py-1 rounded">
              About Course
            </button>
            <Link to={`/subject/${course._id}`}>
              <button className="bg-blue-500 text-white px-2 py-1 rounded">
                Start Learning
              </button>
            </Link>
          </div>
        ) : (
          <div className="mt-2 flex gap-2">
            <button className="bg-gray-500 text-white px-2 py-1 rounded">
              About Course
            </button>
            <button
              onClick={onBuy}
              className="bg-orange-500 text-white px-2 py-1 rounded"
            >
              Buy ₹{course.Price}
            </button>
          </div>
        ))}

      {/* Teacher */}
      {role === "teacher" && (
        <Link to="/updatelecture">
          <button className="mt-2 bg-purple-500 text-white px-2 py-1 rounded">
            Add Material
          </button>
        </Link>
      )}

      {/* Admin */}
      {role === "admin" && (
        <div className="flex justify-between items-center mt-3">
          <Link to={`/updateCourse/${course._id}`}>
            <button className="bg-yellow-500 text-white px-3 py-1 rounded">
              Update
            </button>
          </Link>
          <button
            onClick={() => onDelete(course._id)}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

import { Link } from "react-router-dom";
import CourseCard from "../../components/CourseCard";

const Home = () => {
  return (
    <div className="bg-gradient-to-br from-purple-100 via-purple-50 to-white p-6">
      {/* Hero Section */}
      <section className="py-10 px-6 text-center">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-green-200 via-green-100 to-white rounded-2xl shadow-lg p-10">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            Welcome to CourseHub 🎓
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
            Learn, grow, and achieve your career goals with expert-led courses.
          </p>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <Link
              to="/login"
              className="px-6 py-3 bg-white text-green-600 font-semibold rounded-lg shadow hover:shadow-lg hover:bg-gray-100 transition"
            >
              Login
            </Link>
            <Link
              to="/Signup"
              className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg shadow hover:shadow-lg hover:bg-gray-800 transition"
            >
              Register
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-10 px-6 text-center">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-green-200 via-green-100 to-white rounded-2xl shadow-lg p-10">
          <h2 className="text-3xl font-bold text-gray-800">About Us</h2>
          <p className="mt-4 text-gray-600 text-lg">
            CourseHub is designed to make online learning simple, engaging, and
            effective. Whether you’re a beginner or an advanced learner, we
            offer high-quality courses in programming, web development, data
            science, and more.
          </p>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="py-10 px-6 text-center">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-green-200 via-green-100 to-white rounded-2xl shadow-lg p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">
            What Our Students Say 💬
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
            {/* Feedback 1 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <p className="text-gray-700 italic">
                “CourseHub helped me understand JavaScript from scratch! The
                instructors are great, and I loved the hands-on projects.”
              </p>
              <h4 className="mt-4 font-semibold text-green-600">— Rahul Mehta</h4>
              <p className="text-sm text-gray-500">B.Tech Student</p>
            </div>

            {/* Feedback 2 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <p className="text-gray-700 italic">
                “The platform is super easy to use. I was able to build my first
                full-stack project after taking the React and Node.js courses.”
              </p>
              <h4 className="mt-4 font-semibold text-green-600">— Sneha Verma</h4>
              <p className="text-sm text-gray-500">Computer Science Student</p>
            </div>

            {/* Feedback 3 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <p className="text-gray-700 italic">
                “Loved the structure and the clarity of the lessons. CourseHub
                truly made learning enjoyable for me!”
              </p>
              <h4 className="mt-4 font-semibold text-green-600">— Aman Gupta</h4>
              <p className="text-sm text-gray-500">Engineering Student</p>
            </div>

            {/* Feedback 4 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <p className="text-gray-700 italic">
                “The best online learning experience I’ve had so far! The
                progress tracking and smooth UI are amazing.”
              </p>
              <h4 className="mt-4 font-semibold text-green-600">— Priya Sharma</h4>
              <p className="text-sm text-gray-500">IT Student</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

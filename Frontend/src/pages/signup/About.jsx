import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="bg-gradient-to-br from-green-100 via-white to-green-50 min-h-screen py-12 px-6">
      {/* Header Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 mb-4">
          About CourseHub
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          CourseHub is your one-stop online learning platform that empowers
          students to learn new skills, upgrade their knowledge, and build their
          future — anytime, anywhere.
        </p>
      </section>

      {/* Mission & Vision Section */}
      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition">
          <h2 className="text-2xl font-bold text-green-600 mb-4">🎯 Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            Our mission is to make high-quality education accessible to everyone
            around the globe. We believe learning should be interactive,
            engaging, and practical — preparing learners for real-world
            challenges and opportunities.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition">
          <h2 className="text-2xl font-bold text-green-600 mb-4">🌍 Our Vision</h2>
          <p className="text-gray-600 leading-relaxed">
            To create a world where education knows no boundaries — where every
            learner can explore their potential, gain hands-on skills, and
            contribute meaningfully to the global tech community.
          </p>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="max-w-5xl mx-auto text-center mb-16">
        <h2 className="text-3xl font-bold text-green-700 mb-8">Why Choose CourseHub?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition">
            <h3 className="text-xl font-semibold text-green-600 mb-3">📚 Expert Instructors</h3>
            <p className="text-gray-600">
              Learn from industry experts who bring practical knowledge and
              years of experience to each course.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition">
            <h3 className="text-xl font-semibold text-green-600 mb-3">💻 Hands-On Learning</h3>
            <p className="text-gray-600">
              Practice-driven courses that include real projects, coding tasks,
              and quizzes to solidify your understanding.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition">
            <h3 className="text-xl font-semibold text-green-600 mb-3">🏆 Career-Oriented</h3>
            <p className="text-gray-600">
              Courses designed to help you build portfolios, crack interviews,
              and get job-ready skills.
            </p>
          </div>
        </div>
      </section>

     

      {/* CTA Section */}
      <section className="text-center mt-16">
        <div className="bg-gradient-to-r from-green-200 via-green-100 to-white rounded-2xl shadow-lg p-10 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-gray-600 mb-6">
            Join thousands of learners who are already building their future
            with CourseHub today.
          </p>
          <Link
            to="/signup"
            className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 hover:shadow-xl transition"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;

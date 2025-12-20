import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting us! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="bg-gradient-to-br from-green-100 via-white to-green-50 min-h-screen py-12 px-6">
      {/* Header Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 mb-4">
          Contact Us
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Have questions, feedback, or collaboration ideas?  
          We'd love to hear from you! Fill out the form below or reach us directly.
        </p>
      </section>

      {/* Contact Form Section */}
      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Form */}
        <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-2xl transition">
          <h2 className="text-2xl font-semibold text-green-700 mb-6">
            Send us a message 📩
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400 focus:outline-none"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400 focus:outline-none"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400 focus:outline-none"
                placeholder="Enter subject"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400 focus:outline-none"
                placeholder="Write your message..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg shadow hover:bg-green-700 hover:shadow-xl transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Details */}
        <div className="bg-gradient-to-br from-green-200 via-green-100 to-white shadow-lg rounded-2xl p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-green-700 mb-6 text-center">
            Get in Touch 📞
          </h2>
          <div className="space-y-6 text-gray-700">
            <div>
              <h3 className="font-semibold text-lg text-green-600">📍 Address</h3>
              <p className="text-gray-600 mt-2">
                CourseHub Headquarters,  
                123 Learning Avenue, New Delhi, India
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-green-600">📧 Email</h3>
              <p className="text-gray-600 mt-2">support@coursehub.com</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-green-600">📞 Phone</h3>
              <p className="text-gray-600 mt-2">+91 98765 43210</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-green-600">⏰ Office Hours</h3>
              <p className="text-gray-600 mt-2">Mon – Fri, 9:00 AM – 6:00 PM</p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-gray-500">
              You can also follow us on our social media handles for updates!
            </p>
            <div className="flex justify-center gap-5 mt-4">
              <a
                href="#"
                className="text-green-700 hover:text-green-800 transition"
                title="Facebook"
              >
                🌐
              </a>
              <a
                href="#"
                className="text-green-700 hover:text-green-800 transition"
                title="Twitter"
              >
                🐦
              </a>
              <a
                href="#"
                className="text-green-700 hover:text-green-800 transition"
                title="Instagram"
              >
                📸
              </a>
              <a
                href="#"
                className="text-green-700 hover:text-green-800 transition"
                title="LinkedIn"
              >
                💼
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

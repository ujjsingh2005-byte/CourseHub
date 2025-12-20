import { Link } from "react-router-dom";
import { useContext } from "react";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-green-100 to-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-green-600">
          CourseHub
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-green-600">
            Home
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-green-600">
            About
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-green-600">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

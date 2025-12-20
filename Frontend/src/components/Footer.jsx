const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white py-6 mt-10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          {/* Left Section */}
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-xl font-bold">CourseHub</h2>
            <p className="text-sm text-gray-400">
              Learn, Grow, and Achieve with our platform.
            </p>
          </div>
  
          {/* Middle Section */}
          <div className="flex space-x-6 text-sm">
            <a href="/" className="hover:text-green-400">Home</a>
            <a href="/courses" className="hover:text-green-400">Courses</a>
            <a href="/about" className="hover:text-green-400">About</a>
            <a href="/contact" className="hover:text-green-400">Contact</a>
          </div>
  
          {/* Right Section */}
          <div className="text-gray-400 text-sm mt-4 md:mt-0">
            © {new Date().getFullYear()} All rights reserved.
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  
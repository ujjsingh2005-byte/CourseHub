import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/signup/Home";
import About from "./pages/signup/About";
import Verify from "./pages/signup/verify";
import Contact from "./pages/signup/Contact";
import Login from "./pages/login/StudentLogin";
import Signup from "./pages/signup/signup";
import Teacherlogin from "./pages/login/Teacherlogin";
import Adminlogin from "./pages/login/Adminlogin";
import StudentDashboard from "./pages/Dashboard/StudentDashboard";
import TeacherDashboard from "./pages/Dashboard/TeacherDashboard";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import CourseDashboard from "./pages/Subject/Subject";
import SubjectDashboard from "./pages/Subject/Subject";
import LecturePage from "./pages/Lecture/Lecture";
import CourseUpdate from "./pages/Subject/UpdateCourse";
import UploadLecture from "./pages/Lecture/updateLecture";

import Success from "./pages/signup/success";
import AddCourse from "./pages/Subject/AddCourse";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Verify" element={<Verify/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/success" element={<Success/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/subject/:courseId" element={<SubjectDashboard />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Adminlogin" element={<Adminlogin />} />
        <Route path="/Teacherlogin" element={<Teacherlogin />} />
        <Route path="/StudentDashboard" element={<StudentDashboard/>} />
        <Route path="/Teacher" element={<TeacherDashboard/>} />
        <Route path="/AdminDashboard" element={<AdminDashboard/>} />
        <Route path="/lecture" element={<LecturePage />} />
        <Route path="/updateCourse/:id" element={<CourseUpdate/>}/>
        <Route path="/lecture/:CourseId/:subjectId" element={<LecturePage />} />
        <Route path="/updatelecture" element={<UploadLecture/>}/>
        
        <Route path="/addCourse" element={<AddCourse/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

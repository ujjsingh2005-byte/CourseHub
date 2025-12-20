import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  signupValidation,
  loginupValidation,
  AdminloginupValidation
} from "../middleware/AuthValidation.js";

import upload from "../middleware/multer.js";

import {
  StudentSignup,
  StudentLogin,
  AdminLogin,
  TeacherLogin,
  TeacherSignup,
  AddCourse,
  DelCourse,
  AddSubject,
  DelSubject,
  DelNotes,
  DelDpp,
  DelVideos,
  createOrder,
  verifyPayment,
  allCourses,
  getenrolledCourse,
  postenroll,
  UpdateCourse,
  CourseDeatils,
  verifyOtp,
  AdminSignup,
  uploadMaterial,
  uploadlecture,
  getLectures
} from "../Controllers/AuthController.js";

const router = express.Router();


router.post("/Signup", signupValidation, StudentSignup);
router.post("/StudentLogin", loginupValidation, StudentLogin);

router.post("/TeacherSignup", TeacherSignup);
router.post("/TeacherLogin", loginupValidation, TeacherLogin);

router.post("/AdminSignup", AdminSignup);
router.post("/AdminLogin", AdminloginupValidation, AdminLogin);

router.post("/verify", verifyOtp);


router.post("/AddCourse", verifyToken, upload.single("Thumbnail"), AddCourse);
router.delete("/deleteCourse/:id", verifyToken, DelCourse);
router.put("/courses/:id", verifyToken, UpdateCourse);
router.get("/courses/:id", CourseDeatils);
router.get("/allCourses", allCourses);


router.post("/AddSubject", verifyToken, AddSubject);
router.post("/DelSubject", verifyToken, DelSubject);

router.get("/lectures/:courseId", getLectures);

router.post(
  "/upload-lecture",
  
  upload.single("video"),
  uploadlecture
);

router.post(
  "/upload-material",
 
  upload.single("file"),
  uploadMaterial
);

router.post(
  "/deleteFile/:lectureId/:type",
  verifyToken,
  DelVideos
);


router.post("/DelNotes", verifyToken, DelNotes);
router.post("/DelDpp", verifyToken, DelDpp);

router.post("/createOrder", verifyToken, createOrder);
router.post("/verifyPayment", verifyPayment);


router.get("/:id/courses", getenrolledCourse);
router.post("/:id/enroll/:courseCode", postenroll);

export default router;

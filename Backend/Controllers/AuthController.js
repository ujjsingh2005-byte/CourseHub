import dotenv from 'dotenv';
dotenv.config();

import StudentModel from "../models/student.js";
import TeacherModel from "../models/Teacher.js";
import LectureModel from "../models/Lecture.js";
import SubjectModel from "../models/Subject.js";
import CourseModel from "../models/Course.js";
import AdminModel from "../models/Admin.js";
import { sendVerification } from "../middleware/Email.config.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import crypto from "crypto";

import Razorpay from "razorpay";
import cloudinary, { uploadToCloudinary } from "../Cloudinary.js"; 
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });


const StudentSignup = async(req,res)=>{
    try{
        const {Name,Mobile,EmailId,Gender,Password}=req.body;
    const user=await StudentModel.findOne({EmailId});
    if(user){
        return res.status(200)
        .json({message:'Student already registered',success:false});
    }
    const VerificationCode=Math.floor(100000 + Math.random() * 900000).toString();
    const student=new StudentModel({
        Name,Mobile,EmailId,Gender,VerificationCode
    });
    student.Password=await bcrypt.hash(Password,10);
    student.isAdmin=false;
   sendVerification(student.EmailId,VerificationCode);
    student.VerificationCode=await bcrypt.hash(VerificationCode,10);
    await student.save();
    res.status(201)
    .json({message:"Registered Successful",success:true,data:student});
    }
    catch(err){
        res.status(500)
          .json({
               message:"Internal Server error please try again after some time",
               success: false
          })
    }
    
}
const StudentLogin=async(req,res)=>{
    try{
        const {EmailId,Password}=req.body;
        const user=await StudentModel.findOne({EmailId});
        const errMsg = 'User does not exist or password is wrong';
        if(!user){
            return res.status(200)
            .json({message:errMsg,success:false});
        }
        const isEqual= await bcrypt.compare(Password,user.Password);
        if(!isEqual){
            return res.status(200)
            .json({message:errMsg,success:false});
        }
        const jwtToken =  jwt.sign(
            {EmailId:user.EmailId, _id:user._id, isAdmin:user.isAdmin,Name:user.Name},
            process.env.JWT_SECRET,
            { expiresIn : '20m'}
        ) 
        

    res.status(200)
        .json({message : "login successfull",
            success:true,
            token:jwtToken,
            EmailId,
            id:user._id,
            name: user.Name
        })
} catch (err){

    res.status(500)
      .json({
           message:"Internal Server error please try again after some time",
           success: false
      })
}

}
const TeacherSignup = async(req,res)=>{
    try{
        const {Name,Mobile,EmailId,Experience,Age,Gender,Password}=req.body;
    const user=await TeacherModel.findOne({EmailId});
    if(user){
        return res.status(200)
        .json({message:'This email have already registered',success:false});
    }
    
    const teacher=new TeacherModel({
        Name,Mobile,EmailId,Experience,Gender,Age
    });
    teacher.Password=await bcrypt.hash(Password,10);
    teacher.IsAdmin=false;
   
    
    await teacher.save();
    res.status(201)
    .json({message:"Registered Successful",success:true,data:teacher});
    }
    catch(err){
        res.status(500)
          .json({
               message:"Internal Server error please try again after some time",
               success: false
          })
    }
    
}
const TeacherLogin=async(req,res)=>{
    try{
        const {EmailId,Password}=req.body;
        const user=await TeacherModel.findOne({EmailId});
        const errMsg = 'User does not exist or password is wrong';
        if(!user){
            return res.status(200)
            .json({message:errMsg,success:false});
        }
        const isEqual= await bcrypt.compare(Password,user.Password);
        if(!isEqual){
            return res.status(200)
            .json({message:errMsg,success:false});
        }
        const jwtToken=jwt.sign({
            EmailId:user.EmailId,_id:user._id,isAdmin:user.IsAdmin,Name:user.Name}
        , process.env.JWT_SECRET,
        { expiresIn : '30m'}) 
    

    res.status(200)
        .json({message : "login successfull",
            success:true,
            token:jwtToken,
            EmailId,
            id:user._id,
            name: user.Name
        })
} catch (err){

    res.status(500)
      .json({
           message:"Internal Server error please try again after some time",
           success: false
      })
}

}
const AdminSignup=async(req,res)=>{
  try{
    const {Name,Mobile,EmailId,Password}=req.body;
    const user=await AdminModel.findOne({EmailId});
    if(user){
      res.status(200)
      .json({message:"Admin is already registered"});
    }
    const admin=new AdminModel({Name,Mobile,EmailId,Password});
    await admin.save();res.status(201)
    .json({message:"Registered Successful",success:true,data:admin});
    }
    catch(err){
        res.status(500)
          .json({
               message:"Internal Server error please try again after some time",
               success: false
          })
    }
}
const AdminLogin=async(req,res)=>{
    try{
        const {EmailId,Password}=req.body;
        const user=await AdminModel.findOne({EmailId});
       
        if(!user){
            return res.status(200)
            .json({message:"User does not exist",success:false});
        }
        //const isEqual= await bcrypt.compare(Password,user.Password);
        if(Password!=user.Password){
            return res.status(200)
            .json({message:"Password is wrong",success:false});
        }
        const jwtToken=jwt.sign({
            EmailId:user.EmailId,_id:user._id,isAdmin:true,Name:user.Name}
        , process.env.JWT_SECRET,
        { expiresIn : '20m'}
    ) 

    res.status(200)
        .json({message : "login successfull",
            success:true,
            token:jwtToken,
            EmailId,
           
        })
} catch (err){

    res.status(500)
      .json({
           message:"Internal Server error please try again after some time",
           success: false
      })
}

}
const verifyOtp = async (req, res) => {
    try {
      

      const { pin , EmailId } = req.body;
      
      if (!EmailId || !pin) {
        return res.status(400).json({
          success: false,
          message: "Email and OTP are required.",
        });
      }
      const user = await StudentModel.findOne( {EmailId} );
      if (user) {
  
        if(!user.VerificationCode){
          return res.status(400).json({
            success:false,
            message:"No verification code is available for this "
          });
        }
        
        const isPassEqual = await bcrypt.compare(pin, user.VerificationCode);
  
        if(isPassEqual){
  
          user.isVerified  = true;
          user.VerificationCode = undefined;
          await user.save();
          return res.status(200).json({
          success: true,
          message: "You are successfully verified",
             });
  
        }
        else{
          await StudentModel.deleteOne({ _id: user._id }); 
          return res.status(200).json({
          success: false,
          message: "Invalid OTP or expired code. Register again.",
        });
        }
      } else {
          // user.email = undefined;
          // user.isVerified = false;
        return res.status(200).json({
          success: false,
          message: "User Not Found",
        });
      }
    } catch (error) {
      console.error("Verification error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };
  
const AddSubject=async(req,res)=>{
    try{
        const { Courseid, SubjectName, Code, TeacherName } = req.body;

    
    const course = await CourseModel.findOne({ Courseid: Courseid });
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
        success: false,
      });
    }

        const findSub=await SubjectModel.findOne({Courseid});
        if(findSub){
            return res.status(200)
        .json({message:'This Subject  already registered',success:false});
        }
        else{
            const sub=new SubjectModel({
                SubjectName,Code,TeacherName
            });
            await sub.save();
            course.Subjects.push(sub._id);
            await course.save();

            res.status(201)
            .json({message:"Subject added",success:true,data:sub});
            
        }
    }
    catch(err){
        res.status(500)
        .json({
             message:"Internal Server error please try again after some time",
             success: false,
             err:err.message
        });
    }
}
// Delete a subject from a course
const DelSubject = async (req, res) => {
  try {
    const { courseId, subjectName } = req.body;

    const course = await CourseModel.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // Filter out the subject to delete
    course.Subjects = course.Subjects.filter(
      (sub) => sub.SubjectName !== subjectName
    );

    await course.save();

    res.status(200).json({ message: "Subject removed", success: true, data: course });
  } catch (err) {
    console.error("DelSubject Error:", err);
    res.status(500).json({ message: "Failed to delete subject", success: false, error: err.message });
  }
};


const AddCourse = async (req, res) => {
 try {
    const { Courseid, CourseName, Description, Price } = req.body;
    const Subjects = req.body.Subjects ? JSON.parse(req.body.Subjects) : [];

    let thumbnailUrl = null;
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, "course-thumbnails", "image");
      thumbnailUrl = result.secure_url;
    }

    const course = new CourseModel({
      Courseid,
      CourseName,
      Description,
      Price,
      Subjects,
      Thumbnail: thumbnailUrl,
    });

    await course.save();
    res.status(201).json({ success: true, course });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};



const uploadlecture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No video file" });
    }

    const { title, LectureNo, Description, course, subject } = req.body;

    const result = await uploadToCloudinary(
      req.file.buffer,
      "course_videos",
      "video"
    );

    const lecture = await LectureModel.create({
      title,
      LectureNo,
      Description,
      Video: result.secure_url,
      course,
      subject
    });

    res.status(201).json({ success: true, lecture });
  } catch (err) {
    console.error("UPLOAD LECTURE ERROR 🔥", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};



const uploadMaterial = async (req, res) => {
  try {
    const { lectureId, type } = req.body;
    if (!req.file) return res.status(400).json({ success: false });

    const result = await uploadToCloudinary(
      req.file.buffer,
      "course_materials",
      "raw"
    );

    const update =
      type === "Notes"
        ? { Notes: result.secure_url }
        : { DPP: result.secure_url };

    await LectureModel.findByIdAndUpdate(lectureId, update);
    res.json({ success: true });
  } catch (err) {
    console.error("UPLOAD MATERIAL ERROR 🔥", err);
    res.status(500).json({ success: false });
  }
};


export const getLectures = async (req, res) => {
  try {
    const lectures = await LectureModel.find({ course: req.params.courseId });
    res.status(200).json({ lectures }); // <-- wrap in object
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch lectures" });
  }
};





const DelCourse=async(req,res)=>{
    try{
      const { id } = req.params;
      const deletedCourse = await CourseModel.findByIdAndDelete(req.params.id);
      if (!deletedCourse) {
        return res.status(404).json({ message: "Course not found" });
      }
        res.status(201)
            .json({message:"course removed",success:true,data:CourseModel});
    }
    catch(err){
        res.status(500)
        .json({
            message:"Internal server error please try again after some time",
            success:false
        });
    }
}


const DelVideos=async (req, res) => {
  try {
    const { lectureId, type } = req.params;
    const lecture = await LectureModel.findById(lectureId);
    if (!lecture) return res.status(404).json({ message: "Lecture not found" });

    const fileUrl = lecture[type];
    if (!fileUrl) return res.status(404).json({ message: "No file found to delete" });

    // Extract S3 Key from URL
    const key = decodeURIComponent(fileUrl.split(".amazonaws.com/")[1]);

    await s3.deleteObject({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
    }).promise();

    lecture[type] = undefined;
    await lecture.save();

    res.json({ message: `${type} deleted successfully` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const getMaterial= async (req, res) => {
  try {
    const lectures = await LectureModel.find({ course: req.params.courseId });
    res.json(lectures);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


const getLecture=async (req, res) => {
  try {
    const lecture = await LectureModel.findById(req.params.id);
    if (!lecture) return res.status(404).json({ message: "Lecture not found" });
    res.json(lecture);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


const DelNotes=async(req,res)=>{
    try{
       const {LectureNo}=req.body;
        const result = await CourseModel.updateOne({ LectureNo }, { $unset: { Notes: "" } });
        if (result.modifiedCount === 0) {
            return res.status(404).json({
              message: "No notes found",
              success: false
            });
          }
        res.status(201)
            .json({message:"Notes removed",success:true});
    }
    catch(err){
        res.status(500)
        .json({
            message:"Internal server error please try again after some time",
            success:false
        });
    }
}
const DelDpp=async(req,res)=>{
    try{
       const {LectureNo}=req.body;
        const result = await CourseModel.updateOne({ LectureNo }, { $unset: { DPP: "" } });
        if (result.modifiedCount === 0) {
            return res.status(404).json({
              message: "No DPP found",
              success: false
            });
          }
        res.status(201)
            .json({message:"DPP removed",success:true});
    }
    catch(err){
        res.status(500)
        .json({
            message:"Internal server error please try again after some time",
            success:false
        });
    }
}
const CourseDeatils= async (req, res) => {
  const course = await CourseModel.findById({ _id: req.params.id });
  if (!course) return res.status(404).send("Course not found");
  res.json(course);
}



const UpdateCourse = async (req, res) => {
  try {
    const updated = await CourseModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Course not found" });
    res.status(200).json(updated);
  } catch (err) {
    console.error("UpdateCourse Error:", err);
    res.status(500).json({ message: "Failed to update course", error: err.message });
  }
};






// Create Razorpay order
const createOrder = async (req, res) => {
  try {
    const {courseId, studentId } = req.body;
    const course = await CourseModel.findOne({ Courseid: courseId });
const amount = course.Price;

    // Validate required fields
    if (!amount || !courseId || !studentId) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Initialize Razorpay
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
   
    const options = {
      amount: amount * 100, // in paise
      currency: "INR",
      receipt: `receipt_${courseId}_${studentId}`,
    };

    const order = await razorpay.orders.create(options);
    console.log("Razorpay Order Created:", order);

    res.status(200).json({ success: true, order });
  } catch (err) {
    console.error("CreateOrder Error:", err);
    console.log("Razorpay Key ID:", process.env.RAZORPAY_KEY_ID);
console.log("Razorpay Key Secret:", process.env.RAZORPAY_KEY_SECRET ? "Loaded ✅" : "Missing ❌");

    res.status(500).json({ success: false, message: "Error creating Razorpay order", error: err.message });
  }
};

// Verify Razorpay payment
 const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courseId,
      studentId,
    } = req.body;

  
    if (!courseId || !studentId) {
      return res.status(400).json({
        message: "courseId and studentId are required",
      });
    }

   
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    
    await StudentModel.findByIdAndUpdate(
      studentId,
      { $addToSet: { enrolledCourses: courseId } },
      { new: true }
    );

    return res.status(200).json({
      status: "success",
      message: "Payment verified & course enrolled",
    });
  } catch (error) {
    console.error("verifyPayment error:", error);
    return res.status(500).json({
      message: "Internal server error during payment verification",
    });
  }
};



const allCourses=async (req, res) => {
  try {
    const courses = await CourseModel.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch courses" });
  }
}
const getenrolledCourse= async (req, res) => {
  try {
    const student = await StudentModel.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(student.enrolledCourses); // returns array of course IDs
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch student courses" });
  }
}


const postenroll= async (req, res) => {
  try {
    const student = await StudentModel.findById(req.params.id);
    if (!student) return res.status(404).json({ error: "Student not found" });

    if (!student.enrolledCourses.includes(req.params.courseCode)) {
      student.enrolledCourses.push(req.params.courseCode);
      await student.save();
    }

    res.json({ message: "Enrolled successfully", purchasedCourses: student.enrolledCourses });
  } catch (error) {
    res.status(500).json({ error: error.message});
  }
}







export {StudentSignup,StudentLogin,AdminSignup,AdminLogin,TeacherLogin,getMaterial,getLecture,uploadMaterial,uploadlecture,TeacherSignup,verifyOtp,AddCourse,DelCourse,allCourses,getenrolledCourse,postenroll,UpdateCourse,CourseDeatils,AddSubject,DelSubject,DelNotes,DelDpp,DelVideos,createOrder,verifyPayment};
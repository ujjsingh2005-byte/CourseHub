import mongoose from "mongoose";
const CourseSchema=new mongoose.Schema({
    Courseid:{
        type:String,
        required:true
    },
    Description: {
        type: String,
      },
    Thumbnail: {
        type: String,
      },
    CourseName:{
        type:String,
        required:true
    },
    Price:{
        type:Number,
        default:0
    },
    Subjects:[{
        SubjectName: String,
        Code:String,
      TeacherName: String,
    }],
    Lectures: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lecture" }],
    enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }]
});
const CourseModel=mongoose.model('course',CourseSchema);
export default CourseModel;
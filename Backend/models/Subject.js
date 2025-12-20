import mongoose from "mongoose";
const SubjectSchema=new mongoose.Schema({
    SubjectName:{
        type:String,
        required:true
    },
    Code:{
        type:String,
        required:true
    },
    TeacherName:{
        type:String,
        required:true
    },
    Lectures: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lecture" }], 
  course: { type: mongoose.Schema.Types.ObjectId, ref: "course" }
    
});
const SubjectModel=mongoose.model("Subject",SubjectSchema);
export default SubjectModel;
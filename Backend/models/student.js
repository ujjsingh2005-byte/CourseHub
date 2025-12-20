import mongoose from "mongoose";
const StudentSchema=new mongoose.Schema({
    
    Name:{
        type:String,
        required:true
    }, 
    Mobile:{    type:Number,
        required:true,
        
    },
    EmailId:{
        type:String,
        unique:true
    },
    Gender:{
        type:String
    },
    Password:{
        type:String,
        required:true
    },
    isVerified:{
        type:Boolean
    },
    VerificationCode:{
        type:String
    },
    isAdmin:{
        type:Boolean,
        default:false
      },
    Courses:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Course'
        }
    ],
    enrolledCourses: [{ type:String }],
});
const StudentModel=mongoose.model('students',StudentSchema);
export default StudentModel;
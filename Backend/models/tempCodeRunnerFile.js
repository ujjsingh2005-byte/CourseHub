import mongoose from "mongoose";
const TeacherSchema=new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Mobile:{
        type:Number,
        required:true
    },
    EmailId:{
        type:String,
        required:true
    },Experience:{
        type:Number
    },Age:{
        type:String
    },
    Gender:{
        type:String
    },
    Password:{
        type:String,
        required:true
    },
    IsAdmin:{
        type:Boolean,
        default:false
    }
});
const TeacherModel=mongoose.model('Teacher',TeacherSchema);
export default TeacherModel;
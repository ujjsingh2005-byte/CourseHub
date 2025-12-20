import mongoose from "mongoose";
const AdminSchema=new mongoose.Schema({
    
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
    
    Password:{
        type:String,
        required:true
    }
});
const AdminModel=mongoose.model('admin',AdminSchema);
export default AdminModel;
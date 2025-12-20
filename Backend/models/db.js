// import mongoose, { mongo } from "mongoose";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const mongo_url = process.env.MONGO_DB_URL;


mongoose.connect(mongo_url) 
.then(() =>{
    console.log("mongo db connected");
}).catch((err)=>{
    console.log("mongoDb connection error: ",err);
})


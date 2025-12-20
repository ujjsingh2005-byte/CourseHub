import express from "express";
import mongoose from "mongoose";
import './models/db.js'
import router from './routes/AuthRouter.js'
import cors from "cors"
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

app.use('/api',router);
app.use("/uploads", express.static("uploads"));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
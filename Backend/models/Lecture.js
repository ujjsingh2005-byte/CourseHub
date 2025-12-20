import mongoose from "mongoose";

const LectureSchema = new mongoose.Schema({
  title: String,
  LectureNo: Number,
  Description: String,
  Video: String,
  UploadedDate: { type: Date, default: Date.now },
  Notes: String,
  DPP: String,
  subject: String,
  course: String
});

const LectureModel = mongoose.model("Lecture", LectureSchema);
export default LectureModel;

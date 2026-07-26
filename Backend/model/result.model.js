import mongoose, { mongo } from "mongoose";
const resultSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudentProfile",
      required: true,
    },
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
    },
    obtainMarks: {
      type: Number,
      required: true,
    },
    percentage: {
      type: Number,
    },
    grade: {
      type: Number,
    },
    remarks: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["pass", "fail"],
    },
  },
  {
    timestamps: true,
  },
);

resultSchema.index(
  {
    student: 1,
    exam: 1,
  },
  {
    unique: true,
  },
);

const Result = mongoose.model("Result", resultSchema);
export default Result;

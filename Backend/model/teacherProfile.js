import mongoose from "mongoose";

const teacherProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    qualification: {
      type: String,
    },
    experience: {
      type: Number,
    },
    salary: {
      type: Number,
    },
    subjectSpecialization: {
      type: String,
    },
    joinDate: {
      type: Date,
      default: Date.noe,
    },
    phone: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },

    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const teacherProfile = mongoose.model("TeacherProfile", teacherProfileSchema);
export default teacherProfile;

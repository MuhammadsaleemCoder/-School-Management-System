import mongoose, { mongo } from "mongoose";

const sectionSchema = new mongoose.Schema(
  {
    SectionName: {
      type: String,
      required: true,
    },
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Section = mongoose.model("Section", sectionSchema);
export default Section;

import Subject from "../model/subject.model.js";
import Class from "../model/class.model.js";
import TeacherProfile from "../model/teacherProfile.js";

export const createSubject = async (req, res) => {
  try {
    const { subjectName, subjectCode, classId, teacherId, description } =
      req.body;
    if (!subjectCode || !subjectCode || !classId) {
      return res
        .status(400)
        .json({ success: false, message: "Required field missing" });
    }

    const academicClass = await Class.findById(classId);
    if (!academicClass) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }
    if (teacherId) {
      const teacher = await TeacherProfile.findById(teacherId);
      if (!teacher) {
        return res
          .status(404)
          .json({ success: false, message: "Teacher not found" });
      }
    }

    const existingCode = await Subject.findOne({ subjectCode });
    if (existingCode) {
      return res
        .status(400)
        .json({ success: false, message: "subject code already exist" });
    }

    const subject = await Subject.create({
      subjectName,
      subjectCode,
      class: classId,
      teacher: teacherId,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Subject created successfully ",
      subject,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server side error" });
  }
};

export const getAllSubject = async (req, res) => {
  try {
    const subject = await Subject.find()
      .populate("class")
      .populate({
        path: "teacher".populate({
          path: "teacher",
        }),
      });

    res.status(200).json({
      success: true,
      count: subject.length,
      subject,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server side error" });
  }
};

export const updateSubject = async (req, res) => {
  try {
    const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!subject) {
      return res
        .status(404)
        .json({ success: false, message: "Subject not found" });
    }
    res.status(200).json({
      success: true,
      message: "Subject update successfully",
      subject,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server side error" });
  }
};

export const deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      return res
        .status(404)
        .json({ success: false, message: "Subject not found" });
    }

    await subject.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "Subject delete successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server side error" });
  }
};

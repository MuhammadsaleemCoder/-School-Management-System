import Exam from "../model/exam.model.js";

export const createExam = async (req, res) => {
  try {
    const {
      examName,
      classId,
      sectionId,
      subjectId,
      examDate,
      totalMarks,
      passingMarks,
      description,
    } = req.body;

    const exam = await Exam.create({
      examName,
      class: classId,
      section: sectionId,
      subject: subjectId,
      examDate,
      totalMarks,
      passingMarks,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Exam create successfully",
      exam,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server side error",
    });
  }
};

export const getAllExams = async (req, res) => {
  try {
    const exam = await exam
      .find()
      .populate("class")
      .populate("section")
      .populate("subject");

    res.status(200).json({
      success: true,
      count: exam.length,
      exam,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server side error",
    });
  }
};

export const deleteExam = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Exam not found",
      });
    }

    await exam.deleteOne();
    res
      .status(200)
      .json({ success: true, message: "Exam delete successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server side error",
    });
  }
};

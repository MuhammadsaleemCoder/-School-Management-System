import Exam from "../model/exam.model.js";
import Result from "../model/result.model.js";
import StudentProfile from "../model/studentProfile.model.js";

export const addResult = async (req, res) => {
  try {
    const { studentId, examId, obtainedMarks, remarks } = req.body;
    const exam = await Exam.findById(examId);
    if (!exam) {
      return res
        .status(404)
        .json({ success: false, message: "Exam not found" });
    }
    const percentage = ((obtainedMarks / exam.totalMarks) * 100).toFixed(2);
    const status = obtainedMarks >= exam.passingMarks ? "pass" : "fail";
    let grade = "F";
    if (percentage >= 90) grade = "A+";
    else if (percentage >= 80) grade = "A";
    else if (percentage >= 70) grade = "B";
    else if (percentage >= 60) grade = "C";
    else if (percentage >= 50) grade = "D";
    else if (percentage >= 40) grade = "E";

    const result = await Result.create({
      exam: examId,
      obtainedMarks,
      remarks,
      status,
      grade,
      percentage,
    });

    res
      .status(201)
      .json({ success: true, message: "Result create successfully" });
  } catch (error) {
    if (error.code == 11000) {
      return res
        .status(400)
        .json({ success: false, message: "Result already added" });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getStudentResult = async (req, res) => {
  try {
    const result = await Result.find({
      student: req.params.studentId,
    }).populate("exam");
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Exam not found" });
    }
    res.status(200).json({
      success: true,
      count: res.length,
      result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

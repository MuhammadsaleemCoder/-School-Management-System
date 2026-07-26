import Attendance from "../model/attendence.model.js";
import TeacherProfile from "../model/teacherProfile.js";

export const marksAttendance = async (req, res) => {
  try {
    const { classId, sectionId, subjectId, attendanceData } = req.body;
    if (!classId || !sectionId || !subjectId) {
      return res
        .status(400)
        .json({ success: false, message: "Required field missing" });
    }
    const teacherProfile = await TeacherProfile.findOne({ user: req.user._id });
    if (!teacherProfile) {
      return res
        .status(404)
        .json({ success: false, message: "Teacher profile not exist" });
    }
    const attendanceRecord = [];

    for (const item of attendanceData) {
      const attendance = await Attendance.create({
        student: item.studentId,
        class: classId,
        section: sectionId,
        subject: subjectId,
        teacher: teacherProfile._id,
        status: item.status,
        remarks: item.remarks || "",
      });
      attendanceRecord.push(attendance);
    }
    res.status(201).json({
      success: true,
      message: "Attendance marked successfully ",
      attendanceRecord,
    });
  } catch (error) {
    if (error.code == 1100) {
      return res.status(400).json({
        success: false,
        message: "attendance already marked for today",
      });
    }
    res.status(500).json({
      success: false,
      message: "Server side error",
    });
  }
};

export const getAllAttendanceByClass = async (req, res) => {
  try {
    const { classId } = req.params;
    const attendance = await Attendance.find({
      class: classId,
    })
      .populate({
        path: "student",
        populate: {
          path: "user",
        },
      })
      .populate("subject")
      .populate("section");

    res.status(200).json({
      success: true,
      count: attendance.length,
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server side error",
    });
  }
};

export const getStudentAttendance = async (req, res) => {
  try {
    const { studentId } = req.params;
    const attendance = await Attendance.find({ student: studentId })
      .populate("subject")
      .populate("class")
      .populate("section");

    res
      .status(200)
      .json({ success: true, count: attendance.length, attendance });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server side error",
    });
  }
};

export const getAttendanceStats = async (req, res) => {
  try {
    const { studentId } = req.body;
    const totalAttendance = await Attendance.countDocuments({
      student: studentId,
    });

    const presentAttendance = await Attendance.countDocuments({
      student: studentId,
      status: "present",
    });

    const absentAttendance = await Attendance.countDocuments({
      student: studentId,
      status: "absent",
    });

    const percentage = ((presentAttendance / totalAttendance) * 100).toFixed(2);

    res.status(200).json({
      success: false,
      totalAttendance,
      presentAttendance,
      absentAttendance,
      percentage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server side error",
    });
  }
};

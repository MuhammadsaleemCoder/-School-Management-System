import studentProfile from "../model/studentProfile.model";
import studentProfile from "../model/studentProfile.model";
import teacherProfile from "../model/teacherProfile.js";
import teacherProfile from "../model/teacherProfile.js";
import User from "../model/user.model.js";
import bcrypt from "bcryptjs";

export const createStudent = async (req, res) => {
  try {
    const {
        name,
        password,
        email,
        classId,
        sectionId,
        rollNumber,
        fatherName,
        motherName,
        phone,
        gender,
        dob,
        address,
        admissionDate,
      } = req,
      body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exist" });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
      role: "student",
    });

    const studentProfile = await studentProfile.create({
      user: user._id,
      class: classId,
      section: sectionId,
      rollNumber,
      fatherName,
      motherName,
      phone,
      gender,
      dob,
      address,
      admissionDate,
    });
    res.status(201).json({
      success: true,
      message: "Student created successfully",
      user,
      studentProfile,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllStudent = async (req, res) => {
  try {
    const allStudents = await studentProfile
      .find()
      .populate("user")
      .populate("class")
      .populate("section");
    res
      .status(200)
      .json({ success: true, count: allStudents.length, studentProfile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const student = await studentProfile.findById(req.params.id);
    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }
    await User.findByIdAndUpdate(
      student.user,
      {
        name: req.body.name,
        email: req.body.email,
      },
      { new: true },
    );

    const updateStudent = await studentProfile
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate("user")
      .populate("class")
      .populate("section");

    res
      .status(200)
      .json(
        { success: true, message: "Student update successfully" },
        updateStudent,
      );
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const student = await studentProfile.findById(req.params.id);
    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    await User.findByIdAndDelete(student.user);
    await student.deleteOne();
    res
      .status(200)
      .json({ success: true, message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// teacher

export const createTeacher = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      qualification,
      experience,
      salary,
      subjectSpecialization,
      phone,
      gender,
      address,
    } = req.body;
    const existingTeacher = await findOne({ email });
    if (existingTeacher) {
      return res
        .status(400)
        .json({ success: false, message: "User already exist" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      role: "teacher",
    });

    const teacherProfiles = await teacherProfile.create({
      user: user._id,
      qualification,
      experience,
      salary,
      subjectSpecialization,
      phone,
      gender,
      address,
    });

    res.status(201).json({
      success: true,
      message: "Teacher created successfully",
      teacherProfiles,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllTeacher = async (req, res) => {
  try {
    const teacher = await teacherProfile.find().populate("user");
    res.status(200).json({ success: true, message: "All Teacher" }, teacher);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTeacher = async (req, res) => {
  try {
    const teacher = await teacherProfile.findById(req.params.id);
    if (!teacher) {
      return res
        .status(404)
        .json({ success: false, message: "Teacher not found" });
    }
    await User.findByIdAndUpdate(
      teacher.user,
      {
        name: req.body.name,
        email: req.body.email,
      },
      {
        new: true,
      },
    ).populate("user");
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteTeacher = async (req, res) => {
  try {
    const teacher = await teacherProfile.findById(req.params.id);
    if (!teacher) {
      return res
        .status(404)
        .json({ success: false, message: "Teacher not found" });
    }

    await User.findByIdAndDelete(teacher.user);
    await teacher.deleteOne();
    res
      .status(200)
      .json({ success: true, message: "Teacher Delete successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

import Class from "../model/class.model.js";

export const createClass = async (req, res) => {
  try {
    const { className } = req.body;
    if (!className) {
      return res.status(400).json({
        success: false,
        message: "class name is required",
      });
    }

    const existingClass = await Class.findOne({ className });
    if (existingClass) {
      return res
        .status(400)
        .json({ success: false, message: "Class already exist" });
    }

    const newClass = await Class.create({ className });

    res.status(201).json({
      success: true,
      message: "Class created successfully",
      newClass,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "server side error",
    });
  }
};

export const getAllClasses = async (req, res) => {
  try {
    const allClasses = await Class.find().toSorted({ createdAt: -1 });
    res
      .status(200)
      .json({ success: false, count: allClasses.length, allClasses });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "server side error",
    });
  }
};

export const updateClass = async (req, res) => {
  try {
    const { id } = req.params;
    const { className } = req.body;
    const academicClass = await Class.findByIdAndUpdate(
      id,
      { className },
      { new: true },
    );
    if (!academicClass) {
      return res
        .status(404)
        .json({ success: false, message: "class not exist   " });
    }
    res.status(200).json({
      success: true,
      message: "class update successfully",
      academicClass,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: message.error,
    });
  }
};

export const deleteClass = async (req, res) => {
  try {
    const { id } = req.params;
    const academicClass = await Class.findByIdAndDelete(id);

    if (!academicClass) {
      return res
        .status(404)
        .json({ success: true, message: "Class not found" });
    }

    res.status(200).json({
      success: true,
      message: "Class delete successfully",
    });
    await academicClass.deleteOne();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: message.error,
    });
  }
};

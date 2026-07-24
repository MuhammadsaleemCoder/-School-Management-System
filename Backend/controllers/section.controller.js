import Class from "../model/class.model.js";
import Section from "../model/section.model.js";

export const createSection = async (req, res) => {
  try {
    const { sectionName, classId } = req.body;
    if (!sectionName || !classId) {
      return res.status(400).json({
        success: false,
        message: "Field are required",
      });
    }

    const academicClass = await Class.findById(classId);
    if (!academicClass) {
      return res.status(404).json({
        success: false,
        message: "Class not exist",
      });
    }

    const existingSection = await Section.findOne({
      sectionName,
      class: classId,
    });
    if (existingSection) {
      return res.status(400).json({
        success: false,
        message: "Section already exist in this class",
      });
    }

    const section = await Section.create({
      sectionName,
      class: classId,
    });

    res.status(201).json({
      success: true,
      message: "Section created successfully ",
      section,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const getSectionByClass = async (req, res) => {
  try {
    const sections = await Section.find({
      class: req.params.classId,
    }).populate("class");
    res.status(200).json({
      success: true,
      count: sections.length,
      sections,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: message.error,
    });
  }
};

export const updateSection = async (req, res) => {
  try {
    const section = await Section.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!section) {
      return res
        .status(404)
        .json({ success: false, message: "field required" });
    }

    res
      .status(200)
      .json({ success: true, message: "Class update successfully " }, section);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: message.error,
    });
  }
};

export const deleteSection = async (req, res) => {
  try {
    const section = await Section.findById(req.params.id);
    if (!section) {
      return res
        .status(404)
        .json({ success: false, message: "section is not found" });
    }

    await section.deleteOne();
    return res
      .status(200)
      .json({ success: true, message: "section delete Successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: message.error,
    });
  }
};

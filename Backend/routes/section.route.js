import express from "express";

import {
  createSection,
  getSectionByClass,
  deleteSection,
  updateSection,
} from "../controllers/section.controller.js";

import protect from "../middlewares/auth.middleware.js";
import authorizeRoles from "../middlewares/role.middleware.js";

const router = express.Router();

router.post("/create", protect, authorizeRoles("admin"), createSection);

router.get("/:classId", protect, authorizeRoles("admin"), getSectionByClass);

router.put("/:id", protect, authorizeRoles("admin"), updateSection);

router.delete("/delete", protect, authorizeRoles("admin"), deleteSection);

export default router;

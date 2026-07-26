import express from "express";
import {
  createSubject,
  getAllSubject,
  updateSubject,
  deleteSubject,
} from "../controllers/subject.controller.js";

import protect from "../middlewares/auth.middleware.js";
import authorizeRoles from "../middlewares/role.middleware.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("admin"), createSubject);
router.get("/", protect, authorizeRoles("admin"), getAllSubject);
router.put("/:id", protect, authorizeRoles("admin"), updateSubject);
router.delete("/:id", protect, authorizeRoles("admin"), deleteSubject);

export default router;

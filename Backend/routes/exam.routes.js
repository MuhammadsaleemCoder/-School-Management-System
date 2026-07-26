import express from "express";

import {
  createExam,
  getAllExams,
  deleteExam,
} from "../controllers/exam.controller.js";

import protect from "../middlewares/auth.middleware.js";

import authorizedRole from "../middlewares/role.middleware.js";

const router = express.Router();

router.post("/", protect, authorizedRole("admin"), createExam);
router.get("/:id", protect, authorizedRole("admin", "teacher"), getAllExams);
router.delete("/:id", protect, authorizedRole("admin"), deleteExam);

export default router;

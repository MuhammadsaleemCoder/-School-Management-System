import express from "express";

import {
  addResult,
  getStudentResult,
} from "../controllers/result.controller.js";

import protect from "../middlewares/auth.middleware.js";

import authorizedRole from "../middlewares/role.middleware.js";
const router = express.Router();

router.post("/", protect, authorizedRole("teacher", "admin"), addResult);
router.get(
  "/:studentId",
  protect,
  authorizedRole("student", "teacher", "admin"),
  getStudentResult,
);

export default router;

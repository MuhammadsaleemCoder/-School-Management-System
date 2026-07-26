import express from "express";

import {
  marksAttendance,
  getAllAttendanceByClass,
  getStudentAttendance,
  getAttendanceStats,
} from "../controllers/attendance.controller.js";

import protect from "../middlewares/auth.middleware.js";

import authorizeRole from "../middlewares/role.middleware.js";

const router = express.Router();

router.post(
  "/marks",
  protect,
  authorizeRole("teacher", "admin"),
  marksAttendance,
);

router.get(
  "/class/:classId",
  protect,
  authorizeRole("teacher", "admin"),
  getAllAttendanceByClass,
);

router.get(
  "/student/:studentId",
  protect,
  authorizeRole("teacher", "admin", "student"),
  getStudentAttendance,
);

router.get(
  "/student/:studentId",
  protect,
  authorizeRole("teacher", "admin", "student"),
  getAttendanceStats,
);

export default router;

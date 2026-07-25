import express from "express";
import {
  createStudent,
  getAllStudent,
  updateStudent,
  deleteStudent,
  createTeacher,
  getAllTeacher,
  updateTeacher,
  deleteTeacher,
} from "../controllers/userManagement.controller.js";

import protect from "../middlewares/auth.middleware.js";

import authorization from "../middlewares/role.middleware.js";

const Router = express.Router();

//student routes
Router.post("/student", protect, authorization("admin"), createStudent);
Router.get("/students", protect, authorization("admin"), getAllStudent);
Router.put("/student/:id", protect, authorization("admin"), updateStudent);
Router.delete("/student/:id", protect, authorization("admin"), deleteStudent);

//teacher routes
Router.post("/teacher", protect, authorization("admin"), createTeacher);
Router.get("/teachers", protect, authorization("admin"), getAllTeacher);
Router.put("/teacher/:id", protect, authorization("admin"), updateTeacher);
Router.delete("/teacher/:id", protect, authorization("admin"), deleteTeacher);

export default Router;

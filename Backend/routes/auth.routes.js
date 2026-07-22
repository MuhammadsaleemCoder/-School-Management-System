import express from "express";
import {
  logoutUser,
  loginUser,
  forgetPassword,
  resetPassword,
  getMe,
} from "../controllers/auth.controller.js";
import protect from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/forget-password", forgetPassword);
router.put("/reset-password/:token", resetPassword);
router.get("/me", protect, getMe);

export default router;

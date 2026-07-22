import express from "express";
import {
  logoutUser,
  loginUser,
  forgetPassword,
  resetPassword,
} from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/forget-password", forgetPassword);
router.post("/reset-password/:token", resetPassword);

export default router;

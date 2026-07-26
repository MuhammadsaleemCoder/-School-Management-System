import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/db.js";
import seederAdmin from "./utils/adminSeeder.js";
import authRouter from "./routes/auth.routes.js";
import classRoute from "./routes/class.route.js";
import sectionRoute from "./routes/section.route.js";
import userManagementRoutes from "./routes/userManagment.routes.js";
import SubjectRoutes from "./routes/subject.routes.js";
import AttendanceRoutes from "./routes/attendance.route.js";
import ExamRoutes from "./routes/exam.routes.js";
import ResultRoutes from "./routes/result.route.js";
import Result from "./model/result.model.js";

dotenv.config();

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(helmet());
app.use(morgan("dev"));

// database connecting
connectDB();

// seederAdmin
seederAdmin();

//route
app.use("/api/auth", authRouter);
app.use("/api/class", classRoute);
app.use("/api/section", sectionRoute);
app.use("/api/user-management", userManagementRoutes);
app.use("/api/subjects", SubjectRoutes);
app.use("/api/attendance", AttendanceRoutes);
app.use("/api/exam", ExamRoutes);
app.use("/api/result", ResultRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "server is running",
  });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/db.js";
import seederAdmin from "./utils/adminSeeder.js";
import authRouter from "./routes/auth.routes.js";

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

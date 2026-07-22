import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import crypto, { hash } from "crypto";
import sendMailer from "../utils/sendMailer.js";
import { tracingChannel } from "diagnostics_channel";

//Login USer

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res
        .status(400)
        .json({ success: false, message: "All field are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({
        success: false,
        message: "Invalid password and email",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({
        success: false,
        message: "Invalid password and email",
      });
    }

    const token = generateToken(user._id);
    const cookieOptions = {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    res.cookie("token", token, cookieOptions);
    res.status(200).json({
      success: true,
      message: "User login successfully",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//logout user
export const logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).json({ success: true, message: "Logout successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//forget password

export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email field are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not exist" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const hashToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const html = `<div style="font-family:Arial,sans-serif;padding:20px;"> 
        <h2 style="color:#333;">Password Reset Request</h2>
        <p>You requested to reset your password</p>
        <p>click the button below to reset your password</p>
        <a href="${resetUrl}" style="display:inline-block;
        padding:12px 20px;
        background-color:#4f46e5;
        color:#fff;
        text-decoration:none;
        border-radius:5px;
        margin-top:10px ">Reset Password</a> 
        <p style="margin-top:20px">This link expire in 15 minutes</p>
        <p style="margin-top:20px">If you did not request this,please iqnore this email</p>
    </div>`;

    await sendMailer({
      email: user.email,
      subject: "Password Reset Request",
      html,
    });

    res
      .status(200)
      .json({ success: true, message: "Password  reset link sent to email" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    console.log(token);
    const { password } = req.body;
    const hashToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      resetPasswordToken: hashToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expire token" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    user.password = hashPassword;
    user.resetPasswordToken = "";
    user.resetPasswordExpire = undefined;

    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server side error",
      message: error.message,
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server side error",
      message: error.message,
    });
  }
};

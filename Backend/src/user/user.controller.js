import User from "./user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMail from "../utils/mail.js";
import otptemplate from "../utils/otptemplate.js";
import { generateotp } from "../utils/generatesotp.js";

export const createUser = async (req, res) => {
  try {
    const { fullname, mobile, email, password } = req.body;

    if (!fullname || !mobile || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists with this email" });
    }

    const data = {
      fullname,
      mobile,
      email: normalizedEmail,
      password,
    };

    const user = new User(data);
    await user.save();
    console.log("User created successfully:", user);
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ message: "User already exists with this email" });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: error.message });
  }
};

export const sendEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const normalizedEmail = email?.toLowerCase().trim();
    const OTP = String(generateotp());
    if (!normalizedEmail)
      return res.status(400).json({ message: "Email is required" });

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists with this email" });
    }

    console.log("SENDER_EMAIL:", process.env.SENDER_EMAIL); // ✅ add this
    console.log("SENDER_PASSWORD exists:", !!process.env.SENDER_PASSWORD); // ✅ add this

    await sendMail(normalizedEmail, "Your OTP Code", otptemplate(OTP));
    res
      .status(200)
      .json({ message: "Email sent successfully", otp: OTP, success: true });
  } catch (error) {
    console.error("EMAIL ERROR:", error); // ✅ add this
    res.status(500).json({ message: error.message });
  }
};

const createToken = async (user) => {
  const payload = {
    id: user._id,
    fullname: user.fullname,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
  return token;
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = await createToken(user);
    const isProduction =
      process.env.NODE_ENV === "production" ||
      process.env.ENVIRONMENT === "prod";
    const cookieOptions = {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      secure: isProduction,
      httpOnly: true,
      sameSite: isProduction ? "none" : "lax",
      path: "/",
    };

    if (isProduction && process.env.PROD_DOMAIN) {
      cookieOptions.domain = process.env.PROD_DOMAIN;
    }

    res.cookie("authToken", token, cookieOptions);
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

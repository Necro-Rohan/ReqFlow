import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import { registerSchema, loginSchema } from "../validators/authValidator.js";


export const register = async (req, res) => {
  const result = registerSchema.safeParse(req.body)
  if (!result.success) {
    // console.log(result.error.issues.map(e => e.message));
    return res.status(400).json({ errors: result.error.issues.map(e => e.message)[0]});
  }

  let { name, email, password } = result.data;
  email = email.toLowerCase();
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch(error) {
    return res.status(500).json({ message: "Server error" });
  }
}

export const login = async (req, res) => {
  const result = loginSchema.safeParse(req.body)
  if (!result.success) {
    // console.log(result.error.issues.map(e => e.message));
    return res.status(400).json({ errors: result.error.issues.map(e => e.message)[0]});
  }
  
  const { email, password } = result.data;  
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 3600000 * 24 * 7 
    });

    return res.status(200).json({
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch(error) {
    return res.status(500).json({ message: "Server error" });
  }
}
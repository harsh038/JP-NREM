import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User already exists, you can login",
        success: false,
      });
    }

    const userModel = new User({ name, email, password });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();

    return res.status(201).json({
      message: "Signup successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const errMsg = "Auth failed email or password is wrong";
    if (!user) {
      return res.status(403).json({
        message: errMsg,
        success: false,
      });
    }
    const isPasswordEqual = await bcrypt.compare(password, user.password);
    if (!isPasswordEqual) {
      return res.status(403).json({
        message: errMsg,
        success: false,
      });
    }
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      message: "Login successfully",
      success: true,
      jwtToken,
      email,
      name: user.name,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false,
    });
  }
};
export { signup, login };

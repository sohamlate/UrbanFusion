const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const OTP = require("../model/Otp");
require("dotenv").config();

exports.signup = async (req, res) => {
  try {
    const {
      userID,
      email,
      password,
      confirmPassword,
      role,
      department,
      aadhaarNumber,
      PAN,
    } = req.body;

   
    if (
      !userID ||
      !email ||
      !password ||
      !confirmPassword ||
      !role ||
      !department
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }


    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    const permissions = {
      addDepartment: role === "central-admin",
      removeDepartment: role === "central-admin",
      addEmployee: role === "central-admin" || role === "department-admin",
      removeEmployee: role === "central-admin" || role === "department-admin",
    };

    
    const newUser = await User.create({
      userID,
      email,
      password: hashedPassword,
      role,
      permissions,
      department,
      aadhaarNumber,
      PAN,
      complianceAcknowledgement: false,
    });

    const token = jwt.sign(
      { userID: newUser.userID, role: newUser.role, id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: newUser,
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

  
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

   
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    
    const token = jwt.sign(
      { userID: user.userID, role: user.role, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    user.password = undefined; 

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token,
      user,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


exports.changePassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword, confirmNewPassword } = req.body;

    
    if (!email || !oldPassword || !newPassword || !confirmNewPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({
        success: false,
        message: "New passwords do not match",
      });
    }

   
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

   
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect old password",
      });
    }

    
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};





const { v4: uuidv4 } = require('uuid'); // Import UUID
const User = require('../model/User');
const Otp = require('../model/Otp');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendVerificationMail } = require('../utils/mailSender'); // Assuming you have this function
require("dotenv").config();
const otpgenerator = require("otp-generator");


exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const checkuserpresent = await User.findOne({ email }).maxTimeMS(30000);

    if (checkuserpresent) {
      return res.status(401).json({
        success: false,
        message: "User already exist ",
      });
    }

    var otp = otpgenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    console.log("otp generated", otp);

    let result = await Otp.findOne({ otp: otp });

    while (result) {
      var otp = otpgenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });

      result = await Otp.findOne({ otp: otp });
    }

    const otpPayload = { email, otp };

    const otpBody = await Otp.create(otpPayload);
    console.log(otpBody);

    res.status(200).json({
      success: true,
      message: "Otp generated successfully",
      otp,
    });
  } catch (error) {
    console.log("problem in otp generation", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



exports.autoLogin = async (req, res, next) => {
  try {
    const token = req.header("Authorization") ? req.header("Authorization").replace("Bearer ", "") : null;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not found",
      });
    }

    let response;

    try {
      response = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.error("Token verification error:", err.message);
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    console.log(response,"response printing ")

    if (!response) {
      console.log("Invalid response after verification");
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const email = response.email;
    const user = await User.findOne({ email: email });

    if (!user) {
      console.log(email,"user gayab ho gaya");
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    console.log("Autologin backend", response);
    
    return res.status(200).json({
      success: true,
      data: user,
    });

  } catch (err) {
    console.error("Server error:", err.message);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


exports.signup = async (req, res) => {
  try {
    const {
      email,
      password,
      confirmPassword,
      role,
      department,
      aadhaarNumber,
      PAN,
      otp,
    } = req.body;

    if (!email || !password || !confirmPassword || !role || !department || !otp) {
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

    const recentOtpEntry = await Otp.find({ email })
      .sort({ _id: -1 })
      .limit(1)
      .exec();

    if (!recentOtpEntry.length) {
      return res.status(400).json({
        success: false,
        message: "OTP not found",
      });
    }

    const recentOtp = recentOtpEntry[0].otp;

    if (otp !== recentOtp) {
      return res.status(400).json({
        success: false,
        message: "Incorrect OTP",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const permissions = {
      addDepartment: role === "central-admin",
      removeDepartment: role === "central-admin",
      addEmployee: role === "central-admin" || role === "department-admin",
      removeEmployee: role === "central-admin" || role === "department-admin",
    };

    const userID = uuidv4();

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

    await Otp.deleteMany({ email });

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

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    // Find the OTP record
    const otpRecord = await Otp.findOne({ email, otp });
    
    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Check if OTP is expired
    const now = new Date();
    if (now - otpRecord.timeStamp > 5 * 60 * 1000) { // 5 minutes in milliseconds
      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

    // OTP is valid and not expired, proceed with verification
    await Otp.deleteOne({ email, otp }); // Remove the OTP record after successful verification

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.error("Error during OTP verification:", error);
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
      { userID: user.userID, role: user.role, id: user._id , email:email},
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


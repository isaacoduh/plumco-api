const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");

const register = catchAsyncErrors(async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      // throw error exception at this point
      return res
        .status(500)
        .json({ success: false, message: "User with email already exists!" });
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ username, email, password: hashPassword });
    await newUser.save();

    return res
      .status(201)
      .json({ success: true, message: "User registration successful" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Some error occured!" });
  }
});

const login = catchAsyncErrors(async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.status(404).json({
        success: false,
        message: "User with email does not exist. Please Create an Account!",
      });
    }

    const checkPassword = await bcrypt.compare(password, checkUser.password);
    if (!checkPassword) {
      return res.status(500).json({
        success: false,
        message: "Incorrect credentials! Please try again",
      });
    }

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        username: checkUser.username,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "60m" }
    );

    res
      .status(200)
      .cookie("token", token, { httpOnly: true, secure: false })
      .json({
        succes: true,
        message: "Logged In Successfully",
        user: {
          email: checkUser.email,
          role: checkUser.role,
          id: checkUser._id,
          username: checkUser.username,
        },
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Some error occured!" });
  }
});

const logout = catchAsyncErrors((req, res) => {
  res
    .clearCookie("token")
    .json({ success: true, message: "Logged out successfully!" });
});

const checkAuth = catchAsyncErrors((req, res) => {
  const user = req.user;
  res.status(200).json({ message: true, message: "Authenticated User!", user });
});

module.exports = { register, login, logout, checkAuth };

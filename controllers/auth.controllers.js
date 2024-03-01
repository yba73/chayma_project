const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto"); // Import crypto module for generating random tokens
const {
  valdiateRegister,
  valdiateLogin,
  validateforgotPassword,
} = require("../utils/validations/users.schema ");
const generateToken = require("../utils/generateToken");
const sendMail = require("../utils/send.email");
/**
 * @DEC create new user
 * @params POST /api/v1/auth/register
 * @access PUBLIC
 **/
exports.register = async (req, res) => {
  try {
    // Validate data from client (body)
    const { error } = valdiateRegister(req.body);
    if (error)
      return res
        .status(400)
        .json({ message: error.details[0].message, status: "fail" });

    const data = req.body;

    //by me
    const existsUser = await User.findOne({ email: data.email });
    if (existsUser)
      return res
        .status(409)
        .json({ message: "email already exists", status: "fail" });
    // Hash the password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create a new user with additional attributes
    const newUser = new User({
      username: data.username,
      password: hashedPassword,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Send back the token along with any other relevant user data
    return res.json({
      message: "user has been created successfully",
      status: "succees",
      data: {
        token: generateToken(savedUser._id, "1h"),
      },
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

/**
 * @DEC login user
 * @params POST /api/v1/auth/login
 * @access PUBLIC
 **/
// Route to get all users (accessible only by admin)
exports.login = async (req, res) => {
  try {
    // chech data from client (body)
    const { error } = valdiateLogin(req.body);
    if (error)
      return res
        .status(400)
        .json({ message: error.details[0].message, status: "fail" });

    const { email, password } = req.body;

    // Replace this with proper authentication logic using your User model
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(401)
        .json({ message: "Invalid credentials", status: "faild" });
    //compare pasword
    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword)
      return res
        .status(400)
        .json({ message: "Invalid credentials", status: "fail" });

    return res.json({
      message: "user has been logged in success",
      status: "sucess",
      data: { token: generateToken(user._id, "1h") },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
/**
 * @DEC forgot Password
 * @params POST /api/v1/auth/forgot-password
 * @access PRIVTE (only owner)
 **/
exports.forgotPassword = async (req, res) => {
  try {
    // chech data from client (body)
    const { error } = validateforgotPassword(req.body);
    if (error)
      return res
        .status(400)
        .json({ message: error.details[0].message, status: "fail" });
    const { email } = req.body;
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a random token for password reset
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Set the reset token and expiration time for the user
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    // Save the user with the reset token and expiration time
    await user.save();

    // Compose the email message
    const subject = "Password Reset Request";
    const html = `<p>You are receiving this email because you (or someone else) has requested to reset the password for your account.</p>
<p>Please click on the following link to complete the process:</p>
<p><a href="http://localhost:3000/api/v1/auth/reset-password/${resetToken}">Reset Password</a></p>
<p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`;
    // Send the email
    sendMail(email, subject, html);
    return res.json({
      message: "Password reset instructions sent to your email",
      status: "success",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error1" });
  }
};

/**
 * @DEC reste Password
 * @params POST /api/v1/auth/reste-password/:token
 * @access PRIVTE (only owner)
 **/
exports.resetPassword = async (req, res) => {
  try {
    const token = req.params.token;

    const { newPassword } = req.body;

    // Find user by reset token and check if it's valid
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    // If user not found or token expired, return error
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    // Hash the new password with salt rounds
    const hashedPassword = await bcrypt.hash(newPassword, 10); // Use 10 salt rounds

    // Update user's password and clear the reset token fields
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    // Save the updated user
    await user.save();

    return res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error2" });
  }
};

/**
 * @DEC create new user
 * @params POST /api/v1/admin/register
 * @access PUBLIC
 **/
exports.registerAdmin = async (req, res) => {
  try {
    // Validate data from client (body)
    const { error } = valdiateRegister(req.body);
    if (error)
      return res
        .status(400)
        .json({ message: error.details[0].message, status: "fail" });

    const data = req.body;

    //by me
    const existsUser = await User.findOne({ email: data.email });
    if (existsUser)
      return res
        .status(409)
        .json({ message: "email already exists", status: "fail" });
    // Hash the password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create a new user with additional attributes
    await User.create({
      email: data.email,
      password: hashedPassword,
      role: "admin",
    });

    // Send back the token along with any other relevant user data
    return res.json({
      message: "user has been created successfully",
      status: "succees",
      data: {
        token: generateToken(savedUser._id, "1h", "admin"),
      },
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

/**
 * @DEC login user
 * @params POST /api/v1/admin/login
 * @access PUBLIC
 **/
// Route to get all users (accessible only by admin)
exports.loginAdmin = async (req, res) => {
  try {
    // check data from client (body)
    const { error } = valdiateLogin(req.body);
    if (error)
      return res
        .status(400)
        .json({ message: error.details[0].message, status: "fail" });

    const { email, password } = req.body;
    // Replace this with proper authentication logic using your User model
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(401)
        .json({ message: "Invalid credentials", status: "faild" });
    //compare pasword
    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword)
      return res
        .status(400)
        .json({ message: "Invalid credentials", status: "fail" });

    return res.json({
      message: "user has been logged in success",
      status: "sucess",
      data: { token: generateToken(user._id, "1h", "admin") },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

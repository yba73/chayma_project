const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: String,
  lastName: String,
  role: {
    type: String,
    enum: ["admin", "user", "expert"],
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date, // Store the expiration date/time of the reset token
});

module.exports = mongoose.model("User", userSchema);

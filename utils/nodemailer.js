const nodemailer = require("nodemailer"); // Import nodemailer for sending emails

// Create a nodemailer transporter for sending emails

exports.transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

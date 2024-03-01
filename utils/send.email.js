nodemailer = require("nodemailer");

const sendMail = async (email, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",

      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const mailOption = {
      from: process.env.EMAIL,
      to: email,
      subject: subject,
      html: html,
    };

    await transporter.sendMail(mailOption, (error, success) => {
      if (error) {
        throw new Error(`error send email is ${error}`);
      }
    });
  } catch (error) {
    throw new Error(`send email error is ${error}`);
  }
};
module.exports = sendMail;

const jwt = require("jsonwebtoken");

const generateToken = (userId, expirationTime, role = "user") => {
  return jwt.sign({ userId, role }, process.env.secretKey, {
    expiresIn: expirationTime,
  });
};

module.exports = generateToken;

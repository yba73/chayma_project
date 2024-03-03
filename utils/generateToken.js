const jwt = require("jsonwebtoken");

const generateToken = (id, role, expirationTime) => {
  return jwt.sign({ id, role }, process.env.secretKey, {
    expiresIn: expirationTime,
  });
};

module.exports = generateToken;

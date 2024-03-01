const jwt = require("jsonwebtoken");

// Middleware to authenticate requests
exports.authenticateToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token)
      return res.status(401).json({ message: "Unauthorized", status: "fail" });

    jwt.verify(token, process.env.secretKey, (err, user) => {
      if (err)
        return res.status(403).json({ message: "Forbidden", status: "fail" });

      req.user = user;
      next();
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error1" });
    throw new Error(`authenticateToken error ${error}`);
  }
};


const jwt = require("jsonwebtoken");

// Middleware to authenticate requests
exports.authenticateToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    jwt.verify(token, process.env.secretKey, (err, user) => {
      if (err) return res.status(403).json({ message: "Forbidden" });

      req.user = user;
      next();
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error1" });
  }
};

// Middleware to check permissionswsx
exports.checkPermissions = (role) => {
  return (req, res, next) => {
    // Check if the user has the required role
    console.log("req.user", req.user);

    console.log("role", role);
    if (req.user && req.user.role === role) {
      next();
    } else {
      res.status(403).json({ message: "Forbidden: Insufficient permissions" });
    }
  };
};

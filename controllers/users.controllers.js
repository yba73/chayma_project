const User = require("../models/user");

/**
 * @DEC GET All users
 * @params GET /api/v1/admin/users
 * @access PRIVTE (only admin)
 **/
exports.getUsers = async (req, res) => {
  try {
    // Ensure that the user is an admin
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Forbidden: Only admin can access this endpoint" });
    }

    // Retrieve all users from the database
    const users = await User.find();

    return res.json(users); // Send the users as a JSON response
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
// Route to get all users (accessible only by admin)
// zayed hetha !!!!!
exports.getProfile = async (req, res) => {
  try {
    return res.json({ message: "Welcome to your profile!" });
  } catch (error) {}
};

const User = require("../models/user.model");
const { valdiateUdatedUser } = require("../utils/validations/users.schema ");

/**
 * @DEC GET All users
 * @params GET /admin/users
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
    res.status(500).json({ message: "Internal Server Error1" });
    throw new Error(`getUsers error ${error}`);
  }
};
/**
 * @DEC GET  user info
 * @params GET /users/:id
 * @access PRIVTE ( user logged in)
 **/
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user)
      return res
        .status(404)
        .json({ message: "user not found, invalid id", status: "fail" });

    if (user.role === "admin" && req.user.role !== "admin")
      return res
        .status(401)
        .json({ message: "Unauthorized, this admin account", status: "fail" });
    return res.status(200).json({
      message: "user has been get success",
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error1" });
    throw new Error(`getUser error ${error}`);
  }
};

/**
 * @DEC  update user(username, firstName , lastNamr)
 * @params PUT /users/:id
 * @access PRIVTE ( owner of this account)
 **/
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res
        .status(404)
        .json({ message: "user not found, invalid id", status: "fail" });
    if (req.params.id !== req.user.id)
      return res.status(401).json({
        message: "Unauthorized, you are not owner od this account",
        status: "fail",
      });

    // Validate data from client (body)
    const { error } = valdiateUdatedUser(req.body);
    if (error)
      return res
        .status(400)
        .json({ message: error.details[0].message, status: "fail" });

    const { username, firstName, lastName } = req.body;
    const existsUsername = await User.findOne({ username });
    if (existsUsername)
      return res
        .status(409)
        .json({ message: "username already exists", status: "fail" });
    await User.findByIdAndUpdate(req.params.id, {
      username,
      firstName,
      lastName,
    });
    return res.status(200).json({
      message: "user has been updated success",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error1" });
    throw new Error(`getUser error ${error}`);
  }
};

/**
 * @DEC  delete user by admin
 * @params PUT /admin/users/:id
 * @access PRIVTE ( only admin)
 **/
exports.deleteUserByAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res
        .status(404)
        .json({ message: "user not found, invalid id", status: "fail" });

    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      message: "user has been deleted success",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error1" });
    throw new Error(`getUser error ${error}`);
  }
};

/**
 * @DEC  delete all user by admin
 * @params PUT /admin/users/:id
 * @access PRIVTE (only admin)
 **/
exports.deleteUsersByAdmin = async (req, res) => {
  try {
    await User.deleteMany({ role: { $ne: "admin" } }); // delete all user where role !=="admin"

    return res.status(200).json({
      message: "users have been deleted success",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error1" });
    throw new Error(`getUser error ${error}`);
  }
};

const {
  registerAdmin,
  loginAdmin,
} = require("../controllers/auth.controllers");
const { getUsers } = require("../controllers/users.controllers");
const { authenticateToken } = require("../middlewares/auth.middlewarese");
const { isAdmin } = require("../middlewares/isAdmin");

const router = require("express").Router();
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/users", authenticateToken, isAdmin, getUsers);

module.exports = router;

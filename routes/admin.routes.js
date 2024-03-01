const { getUsers } = require("../controllers/users.controllers");
const { authenticateToken } = require("../middlewares/auth.middlewarese");
const { isAdmin } = require("../middlewares/isAdmin");

const router = require("express").Router();
router.get("/users", authenticateToken, isAdmin, getUsers);

module.exports = router;

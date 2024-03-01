const { getUsers } = require("../controllers/auth.controllers");
const { getProfile } = require("../controllers/users.controllers");
const { authenticateToken } = require("../middlewares/auth.middlewarese");

const router = require("express").Router();
router.get("/profile", authenticateToken, getProfile);

module.exports = router;

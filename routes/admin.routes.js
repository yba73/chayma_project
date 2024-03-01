const { getUsers } = require("../controllers/users.controllers");
const {
  authenticateToken,
  checkPermissions,
} = require("../middlewares/auth.middlewarese");

const router = require("express").Router();
router.get("/users", authenticateToken, checkPermissions("admin"), getUsers);

module.exports = router;

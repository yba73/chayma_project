const { getUser, updateUser } = require("../controllers/users.controllers");
const { authenticateToken } = require("../middlewares/auth.middlewarese");
const { vlidateObjectId } = require("../middlewares/validate.object.id");

const router = require("express").Router();
router.get("/:id", authenticateToken, vlidateObjectId, getUser);
router.put("/:id", authenticateToken, vlidateObjectId, updateUser);

module.exports = router;

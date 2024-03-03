const {
  registerAdmin,
  loginAdmin,
} = require("../controllers/auth.controllers");
const {
  getUsers,
  getUser,
  deleteUserByAdmin,
  deleteUsersByAdmin,
} = require("../controllers/users.controllers");
const { authenticateToken } = require("../middlewares/auth.middlewarese");
const { isAdmin } = require("../middlewares/isAdmin");
const { vlidateObjectId } = require("../middlewares/validate.object.id");

const router = require("express").Router();
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

/*==== users roures*/
router.get("/users", authenticateToken, isAdmin, getUsers);
router.get("/users/:id", authenticateToken, isAdmin, vlidateObjectId, getUser);
router.delete("/users", authenticateToken, isAdmin, deleteUsersByAdmin);
router.delete(
  "/users/:id",
  authenticateToken,
  isAdmin,
  vlidateObjectId,
  deleteUserByAdmin
);
/*====// users roures  //=====*/

module.exports = router;

const {
  login,
  register,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth.controllers");

const router = require("express").Router();

router.post("/signin", login);
router.post("/signup", register);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;

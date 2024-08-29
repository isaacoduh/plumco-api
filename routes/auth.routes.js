const express = require("express");
const {
  register,
  login,
  logout,
  checkAuth,
} = require("../controllers/auth.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authMiddleware, logout);
router.get("/check-auth", authMiddleware, checkAuth);

module.exports = router;

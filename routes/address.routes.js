const express = require("express");
const {
  addAddress,
  fetchAllAddress,
  deleteAddress,
  editAddress,
} = require("../controllers/address.controller");
const { authMiddleware, authorize } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/add", authMiddleware, authorize("user"), addAddress);
router.get("/get/:userId", authMiddleware, authorize("user"), fetchAllAddress);
router.delete(
  "/delete/:userId/:addressId",
  authMiddleware,
  authorize("user"),
  deleteAddress
);
router.put(
  "/update/:userId/:addressId",
  authMiddleware,
  authorize("user"),
  editAddress
);

module.exports = router;

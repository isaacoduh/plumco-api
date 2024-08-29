const express = require("express");
const {
  capturePayment,
  createOrder,
  getAllOrdersByUser,
  getOrderDetails,
} = require("../controllers/order.controller");
const { authMiddleware, authorize } = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/create", authMiddleware, authorize("user"), createOrder);
router.post("/capture", capturePayment);
router.get(
  "/list/:userId",
  authMiddleware,
  authorize("user"),
  getAllOrdersByUser
);
router.get("/details/:id", authMiddleware, authorize("user"), getOrderDetails);

module.exports = router;

const express = require("express");
const {
  getAllOrders,
  getOrderDetails,
  updateOrderStatus,
} = require("../../controllers/admin/orders.controller");
const {
  authMiddleware,
  authorize,
} = require("../../middlewares/auth.middleware");

const router = express.Router();

router.get("/", authMiddleware, authorize("admin"), getAllOrders);
router.get("/details/:id", authMiddleware, authorize("admin"), getOrderDetails);
router.put(
  "/update/:id",
  authMiddleware,
  authorize("admin"),
  updateOrderStatus
);

module.exports = router;

const express = require("express");
const {
  addToCart,
  fetchCartItems,
  updateCartItemQuantity,
  deleteCartItem,
} = require("../controllers/cart.controller");
const { authMiddleware, authorize } = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/add", authMiddleware, authorize("user"), addToCart);
router.get("/get/:userId", authMiddleware, authorize("user"), fetchCartItems);
router.put(
  "/update-cart",
  authMiddleware,
  authorize("user"),
  updateCartItemQuantity
);
router.delete(
  "/:userId/:productId",
  authMiddleware,
  authorize("user"),
  deleteCartItem
);

module.exports = router;

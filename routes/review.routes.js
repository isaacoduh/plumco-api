const express = require("express");
const {
  addProductReiew,
  getProductReviews,
} = require("../controllers/review.controller");
const { authMiddleware, authorize } = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/add", authMiddleware, authorize("user"), addProductReiew);
router.get("/:productId", getProductReviews);

module.exports = router;

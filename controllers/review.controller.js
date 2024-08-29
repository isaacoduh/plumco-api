const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Order = require("../models/Order");
const Product = require("../models/Product");
const ProductReview = require("../models/Review");

const addProductReiew = catchAsyncErrors(async (req, res) => {
  try {
    const { productId, userId, username, reviewMessage, reviewValue } =
      req.body;
    const order = await Order.findOne({
      userId,
      "cartItems.productId": productId,
    });
    if (!order) {
      return res.status(403).json({
        success: false,
        message: "You need to make a purchase, to review a product",
      });
    }

    const existingProductReview = await ProductReview.findOne({
      productId,
      userId,
    });

    if (existingProductReview) {
      return res.status(400).json({
        success: false,
        message: "You already reviewed this product!",
      });
    }

    const newReview = new ProductReview({
      productId,
      userId,
      username,
      reviewMessage,
      reviewValue,
    });

    await newReview.save();

    const reviews = await ProductReview.find({ productId });
    const totalReviewsLength = reviews.length;
    const averageReview =
      reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
      totalReviewsLength;

    await Product.findByIdAndUpdate(productId, { averageReview });

    res.status(201).json({
      success: true,
      data: newReview,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
});

const getProductReviews = catchAsyncErrors(async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await ProductReview.find({ productId });
    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error!" });
  }
});

module.exports = { addProductReiew, getProductReviews };

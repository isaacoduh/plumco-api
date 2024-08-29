const express = require("express");
const {
  handleImageUpload,
  addProduct,
  editProduct,
  deleteProduct,
  fetchAllProducts,
} = require("../../controllers/admin/products.controller");
const { upload } = require("../../utils/cloudinary");
const {
  authMiddleware,
  authorize,
} = require("../../middlewares/auth.middleware");

const router = express.Router();

router.post("/upload-image", upload.single("myfile"), handleImageUpload);
router.post("/add", authMiddleware, authorize("admin"), addProduct);
router.put("/edit/:id", authMiddleware, authorize("admin"), editProduct);
router.delete("/delete/:id", authMiddleware, authorize("admin"), deleteProduct);
router.get("/", authMiddleware, authorize("admin"), fetchAllProducts);

module.exports = router;

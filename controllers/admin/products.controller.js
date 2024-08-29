const { imageUploadUtil } = require("../../utils/cloudinary");
const Product = require("../../models/Product");
const { catchAsyncErrors } = require("../../middlewares/catchAsyncErrors");

const handleImageUpload = catchAsyncErrors(async (req, res) => {
  try {
    const base64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + base64;
    const result = await imageUploadUtil(url);

    res.status(200).json({ success: true, result });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Internal Server Error!" });
  }
});

const addProduct = catchAsyncErrors(async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    } = req.body;
    const newProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    });

    await newProduct.save();
    res.status(201).json({
      sucess: true,
      message: "Product Added Successfully!",
      data: newProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error!" });
  }
});

const fetchAllProducts = catchAsyncErrors(async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      success: true,
      message: "Product List Retrieved!",
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error!" });
  }
});

const editProduct = catchAsyncErrors(async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    } = req.body;

    let existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not Found!" });
    }

    existingProduct.title = title || existingProduct.title;
    existingProduct.description = description || existingProduct.description;
    existingProduct.category = category || existingProduct.category;
    existingProduct.brand = brand || existingProduct.brand;
    existingProduct.price = price === "" ? 0 : price || existingProduct.price;
    existingProduct.salePrice =
      salePrice === "" ? 0 : salePrice || existingProduct.salePrice;
    existingProduct.totalStock = totalStock || existingProduct.totalStock;
    existingProduct.image = image || existingProduct.image;
    existingProduct.averageReview =
      averageReview || existingProduct.averageReview;

    await existingProduct.save();
    res.status(200).json({
      success: true,
      message: "Product Updated!",
      data: existingProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: true, message: "Product not found!" });
    }

    res
      .status(200)
      .json({ success: true, message: "Product Deleted Successfully!" });
  } catch (error) {
    console.log(e);
    res.status(500).json({ success: false, message: "Error Occured!" });
  }
};

module.exports = {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
};

const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Address = require("../models/Address");

const addAddress = catchAsyncErrors(async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body;
    if (!userId || !address || !city || !pincode || !phone || !notes) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid data provided!" });
    }

    const newAddress = new Address({
      userId,
      address,
      city,
      pincode,
      notes,
      phone,
    });
    await newAddress.save();
    res.status(201).json({
      success: true,
      message: "Address added successfully!",
      data: newAddress,
    });
  } catch (error) {
    console.log(e);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
});

const fetchAllAddress = catchAsyncErrors(async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User Id is required!" });
    }
    const addressList = await Address.find({ userId });
    res.status(200).json({ success: true, data: addressList });
  } catch (error) {
    console.log(e);
    res.status(200).json({ success: false, message: "Error" });
  }
});

const editAddress = catchAsyncErrors(async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;

    if (!userId || !addressId) {
      return res
        .status(400)
        .json({ success: false, message: "User and address Id is required!" });
    }

    const address = await Address.findOneAndUpdate(
      { _id: addressId, userId },
      formData,
      { new: true }
    );

    if (!address) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found!" });
    }

    res.status(200).json({ success: true, data: address });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: true, message: "Error" });
  }
});

const deleteAddress = catchAsyncErrors(async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    if (!userId || !addressId) {
      return res
        .status(400)
        .json({ success: false, message: "User and address id is required" });
    }

    const address = await Address.findOneAndDelete({ _id: addressId, userId });
    if (!address) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found!" });
    }

    res
      .status(200)
      .json({ success: true, message: "Address Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
});

module.exports = { addAddress, editAddress, fetchAllAddress, deleteAddress };

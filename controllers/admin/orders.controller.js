const { catchAsyncErrors } = require("../../middlewares/catchAsyncErrors");
const Order = require("../../models/Order");

const getAllOrders = catchAsyncErrors(async (req, res) => {
  try {
    const orders = await Order.find({});
    if (!orders.length) {
      return res
        .status(404)
        .json({ success: false, message: "No orders found!" });
    }

    res.status(200).json({
      success: true,
      message: "Orders Retrieved Successfully!",
      data: orders,
    });
  } catch (error) {
    console.log(e);
    res.status(500).json({ success: false, message: "Some error occured!" });
  }
});

const getOrderDetails = catchAsyncErrors(async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found!" });
    }

    res.status(200).json({
      success: true,
      message: "Order Details Retrieved!",
      data: order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Some error occured!" });
  }
});

const updateOrderStatus = catchAsyncErrors(async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const order = await Order.findById(id);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found!" });
    }

    await Order.findByIdAndUpdate(id, { orderStatus });

    res
      .status(200)
      .json({ success: true, message: "Order status updated successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Some error occured!" });
  }
});

module.exports = { getAllOrders, getOrderDetails, updateOrderStatus };

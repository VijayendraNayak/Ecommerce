const Order = require("../models/orderModel");
const Product = require("../models/productmodel");
const { errorHandler } = require("../utils/errorHandler");
const { asyncErrHandler } = require("../middleware/asyncerrorHandler");

// Create new Order
exports.newOrder = asyncErrHandler(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

exports.getorderdetails = asyncErrHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate("user", "name email")
  if (!order) { return next(errorHandler(404, "Product not found")) }
  res.status(200).json({ message: "order found", order })
})
exports.getmyorderdetails = asyncErrHandler(async (req, res, next) => {
  const order = await Order.find({ user: req.user.id })
  if (!order) { return next(errorHandler(404, "Product not found")) }
  res.status(200).json({ message: "your orders", order })
})
exports.getallorderdetails = asyncErrHandler(async (req, res, next) => {
  const order = await Order.find()
  let totalamount = 0
  order.forEach(element => {
    totalamount += order.totalPrice
  });
  if (!order) { return next(errorHandler(404, "Product not found")) }
  res.status(200).json({ message: "Orders", order, totalamount })
})
exports.deleteorder = asyncErrHandler(async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.id)
  if (!order) { return next(errorHandler(404, "Product not found")) }
  res.status(200).json({ message: "The order has been deleted successfully"})
})
exports.updatestatus = asyncErrHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id)
  if (!order) { return next(errorHandler(404, "Product not found")) }
  if (order.orderStatus === "Delivered") { return next(errorHandler(400, "The item has already been delivered")) }
  order.orderItems.forEach(async (order) => {
    await update(order.product, order.quantity)
  })
  order.orderStatus = req.body.status

  if (order.orderStatus === "Delivered") {
    order.deliveredAt = Date.now()
  }
  await order.save({ validateBeforeSave: false })
  res.status(200).json({ message: "Orders", order})
})
const update = async (id, quantity) => {
  const product = await Product.findById(id)
  product.stock -= quantity
  await product.save({ validateBeforeSave: false })
}


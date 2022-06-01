const expressAsyncHandler = require("express-async-handler");
const Order = require("../models/orderSchema");
const { isAuth } = require("../middlewares/authAndValidation");

//Get All The Orders
exports.allOrders = expressAsyncHandler(async (req, res) => {
  const user = req.query.user;
  const pageSize = 20;
  const orderId = req.query.orderId || "";
  const page = Number(req.query.pageNumber) || 1;
  const userOrder = user ? { user } : {};
  const orderIdFilter = orderId
    ? { orderId: { $regex: orderId, $options: "i" } }
    : {};
  const count = await Order.countDocuments({
    ...userOrder,
    ...orderIdFilter,
  });
  const orders = await Order.find({ ...userOrder, ...orderIdFilter })
    .skip(pageSize * (page - 1))
    .limit(pageSize);
  res.send({ orders, page, pages: Math.ceil(count / pageSize) });
});

//Create Order
exports.createOrder = expressAsyncHandler(async (req, res) => {
  if (req.body.orderItems.length === 0) {
    res.status(400).send({ message: "Cart is empty" });
  } else {
    const order = new Order({
      orderId: req.body.orderId,
      orderItems: req.body.orderItems,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      subTotal: req.body.subTotal,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      grandTotal: req.body.grandTotal,
      user: req.body.user,
      orderStatus: req.body.orderStatus,
    });
    const createdOrder = await order.save();
    res.status(201).send({ message: "New Order Created", order: createdOrder });
  }
});

//Update Single Order Details
exports.updateOrder = expressAsyncHandler(async (req, res) => {
  const orderId = req.params.id;
  const order = await Order.findById(orderId);
  if (order) {
    order.orderStatus = req.body.orderStatus;
    const updatedOrder = await order.save();
    res.send({ message: "Order Updated", order: updatedOrder });
  } else {
    res.status(404).send({ message: "Order Not Found" });
  }
});

//Get Single Order Details
exports.singleOrder = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user");

  if (order) {
    res.send(order);
  } else {
    res.status(404).send({ message: "Order not Found" });
  }
});

// Delete Order 
exports.deleteOrders = expressAsyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    const deleteOrder = await order.remove();
    res.json({ message: "Order Deleted!", order: deleteOrder });
  } catch (error) {
    res.status(404).json({ message: "Order Not Found" }); 
  }
});

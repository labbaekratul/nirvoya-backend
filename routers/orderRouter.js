const express = require("express");
const orderRouter = express.Router();
const {
  allOrders,
  createOrder,
  singleOrder,
  updateOrder,
  deleteOrders,
} = require("../controllers/orderController");

orderRouter.get("/", allOrders);
orderRouter.post("/", createOrder);
orderRouter.get("/:id", singleOrder);
orderRouter.put("/:id", updateOrder);
orderRouter.delete("/:id", deleteOrders);

module.exports = orderRouter;

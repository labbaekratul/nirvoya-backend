const express = require("express");
const {
  createProducts,
  allHomeCateProductsDetails,
  allProducts,
} = require("../controllers/homeCatProductController");
const homeCatProductsRouter = express.Router();

homeCatProductsRouter.get("/", allProducts);
homeCatProductsRouter.get("/details", allHomeCateProductsDetails);
homeCatProductsRouter.post("/", createProducts);

module.exports = homeCatProductsRouter;

const expressAsyncHandler = require("express-async-handler");
const HomeCateProducts = require("../models/homePageCateProducts");

exports.allProducts = expressAsyncHandler(async (req, res) => {
  const products = await HomeCateProducts.find({});
  res.send(products);
});

exports.createProducts = expressAsyncHandler(async (req, res) => {
  const product = new HomeCateProducts({
    tittle: req.body.tittle,
    products: req.body.products,
  });
  const createdProduct = await product.save();
  res.send({ message: "New Product Created", size: createdProduct });
});

//Get all the Feature Products with details
exports.allHomeCateProductsDetails = expressAsyncHandler(async (req, res) => {
  const featureCategory = await HomeCateProducts.find({}).populate("products");
  res.send(featureCategory);
});

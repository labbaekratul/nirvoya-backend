const expressAsyncHandler = require("express-async-handler");
const {
  DistrincMainCate,
  DistrincCate,
  DistrincSubCate,
} = require("../models/distincCategorySchema");

//Get all the Main Category
exports.allMainDistincCate = expressAsyncHandler(async (req, res) => {
  const mianCategory = await DistrincMainCate.find({}).populate(
    "mainCategoryId"
  );
  res.send(mianCategory);
});

exports.createMainDistincCate = expressAsyncHandler(async (req, res) => {
  const disMainCate = new DistrincMainCate({
    name: req.body.name,
    mainCategoryId: req.body.mainCategoryId,
  });
  const createdMainDisCate = await disMainCate.save();
  res.send({
    message: "New DisMainCategory Created",
    createdMainDisCategory: createdMainDisCate,
  });
});

//Get all distrinc Category
exports.allDistincCate = expressAsyncHandler(async (req, res) => {
  const category = await DistrincCate.find({}).populate("categoryId");
  res.send(category);
});

exports.createDistincCate = expressAsyncHandler(async (req, res) => {
  const disCate = new DistrincCate({
    name: req.body.name,
    categoryId: req.body.categoryId,
  });
  const createdDisCate = await disCate.save();
  res.send({
    message: "New DisCategory Created",
    createdDisCategory: createdDisCate,
  });
});

//Get all distrinc Sub Category
exports.allSubDistincCate = expressAsyncHandler(async (req, res) => {
  const category = await DistrincSubCate.find({}).populate("subCategoryId");
  res.send(category);
});

exports.createSubDistincCate = expressAsyncHandler(async (req, res) => {
  const disSubCate = new DistrincSubCate({
    name: req.body.name,
    subCategoryId: req.body.subCategoryId,
  });
  const createdSubDisCate = await disSubCate.save();
  res.send({
    message: "New DisCategory Created",
    createdSubDisCategory: createdSubDisCate,
  });
});

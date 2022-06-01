const expressAsyncHandler = require("express-async-handler");
const FeatureCategory = require("../models/featureCategorySchema");

//Get all the FeatureCategory
exports.allFeatureCategory = expressAsyncHandler(async (req, res) => {
  const featureCategory = await FeatureCategory.find({});
  res.send(featureCategory);
});

//Get all the FeatureCategory with details
exports.allFeatureCateDetails = expressAsyncHandler(async (req, res) => {
  const featureCategory = await FeatureCategory.find({}).populate(
    "featureCategory",
    "_id name image.data.url arentId"
  );
  res.send(featureCategory);
});

//Create Feature Category
exports.createFeatureCategory = expressAsyncHandler(async (req, res) => {
  const featureCategory = new FeatureCategory({
    tittle: req.body.tittle,
    subTittle: req.body.subTittle,
    featureCategory: req.body.featureCategory,
  });
  const createFeatureCategory = await featureCategory.save();
  res.send({
    message: "New Feature Category Created",
    featureCategory: createFeatureCategory,
  });
});

//
exports.updateFeatureCategory = expressAsyncHandler(async (req, res) => {
  const featureCateId = req.params.id;
  const featureCate = await FeatureCategory.findById(featureCateId);
  if (featureCate) {
    featureCate.tittle = req.body.tittle;
    featureCate.subTittle = req.body.subTittle;
    featureCate.featureCategory = req.body.featureCategory;
    const updatedFeatureCate = await featureCate.save();
    res.send({ message: "Feature Category Updated", updatedFeatureCate });
  } else {
    res.status(404).send({ message: "Category Not Found" });
  }
});

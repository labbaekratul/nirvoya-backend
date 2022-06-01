const express = require("express");
const {
  allFeatureCategory,
  allFeatureCateDetails,
  createFeatureCategory,
  updateFeatureCategory,
} = require("../controllers/featureCatController");
const featureCateRouter = express.Router();

featureCateRouter.get("/", allFeatureCategory);
featureCateRouter.get("/details", allFeatureCateDetails);
featureCateRouter.post("/", createFeatureCategory);
featureCateRouter.put("/:id", updateFeatureCategory);

module.exports = featureCateRouter;

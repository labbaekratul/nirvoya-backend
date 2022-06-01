const express = require("express");
const categoryRouter = express.Router();

const {
  allcategory,
  childCategories,
  subChildcategories,
  singleCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  multipleMainCategory,
  multipleCategory,
  multipleSubCategory,
} = require("../controllers/categoryController");

categoryRouter.get("/", allcategory);
categoryRouter.get("/parentID", childCategories);
categoryRouter.get("/subparentID", subChildcategories);
categoryRouter.get("/disMainCategory", multipleMainCategory);
categoryRouter.get("/disCategory", multipleCategory);
categoryRouter.get("/disSubCategory", multipleSubCategory);
categoryRouter.get("/:id", singleCategory);
categoryRouter.post("/", createCategory);
categoryRouter.put("/:id", updateCategory);
categoryRouter.delete("/:id", deleteCategory);

module.exports = categoryRouter;

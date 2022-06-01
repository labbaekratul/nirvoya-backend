const express = require("express");
const productRouter = express.Router();
const {
  allProducts,
  seedProducts,
  singleProduct,
  createProduct,
  updateProduct,
  deleteProducts,
  featureProducts,
  searchBoxProducts,
  distinctMainCate,
  distinctCate,
  distinctSubCate,
  productReviews,
  relatedProduct,
  distinctProductCode,
  productQnA,
  productQnARep,
  ProductQnAList,
  addLike,
  removeLike,
  addWishList,
  removeWishList,
  removeDisLike,
  addDisLike,
  entrepreneurProductReviews,
  productAdminDetails,
} = require("../controllers/productController");

productRouter.get("/", allProducts);
productRouter.get("/relatedCategory", relatedProduct);
productRouter.get("/productCode", distinctProductCode);
productRouter.get("/mainCate", distinctMainCate);
productRouter.get("/Cate", distinctCate);
productRouter.get("/subCate", distinctSubCate);
productRouter.get("/searchBox", searchBoxProducts);
productRouter.get("/feature", featureProducts);
productRouter.get("/QnAList", ProductQnAList);
productRouter.get("/seed", seedProducts);
productRouter.get("/entProReviews", entrepreneurProductReviews);
productRouter.get("/:id", singleProduct);
productRouter.get("/admin/:paId", productAdminDetails);
productRouter.post("/", createProduct);
productRouter.post("/:id/reviews", productReviews);
productRouter.post("/:id/QnA", productQnA);
productRouter.put("/:id", updateProduct);
productRouter.put("/:id/addLike", addLike);
productRouter.put("/:id/removeLike", removeLike);
productRouter.put("/:id/addDisLike", addDisLike);
productRouter.put("/:id/removeDisLike", removeDisLike);
productRouter.put("/:id/addWishList", addWishList);
productRouter.put("/:id/removeWishList", removeWishList);
productRouter.put("/:id/QnA", productQnARep);
productRouter.delete("/:id", deleteProducts);

module.exports = productRouter;

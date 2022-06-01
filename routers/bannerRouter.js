const express = require("express");
const bannerRouter = express.Router();
const {
  singleBanner,
  createBanner,
  updateBanner,
  deleteBanner,
  allData,
} = require("../controllers/bannerController");

bannerRouter.get("/", allData);
bannerRouter.get("/:id", singleBanner);
bannerRouter.post("/", createBanner);
bannerRouter.put("/:id", updateBanner);
bannerRouter.delete("/:id", deleteBanner);

module.exports = bannerRouter;

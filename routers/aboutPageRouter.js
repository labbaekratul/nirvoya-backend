const express = require("express");
const abouPageRouter = express.Router();
const {
  allData,
  createAboutPage,
  updateAboutPage,
  deleteAboutPage,
} = require("../controllers/aboutPageController");

abouPageRouter.get("/", allData);
abouPageRouter.post("/", createAboutPage);
abouPageRouter.put("/:id", updateAboutPage);
abouPageRouter.delete("/:id", deleteAboutPage);

module.exports = abouPageRouter;

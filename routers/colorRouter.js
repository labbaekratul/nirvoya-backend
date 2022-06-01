const express = require("express");
const colorRouter = express.Router();
const {
  allColors,
  singleColor,
  createColor,
  updateColor,
  deleteColor,
} = require("../controllers/colorController");

colorRouter.get("/", allColors);
colorRouter.get("/:id", singleColor);
colorRouter.post("/", createColor);
colorRouter.put("/:id", updateColor);
colorRouter.delete("/:id", deleteColor);

module.exports = colorRouter;

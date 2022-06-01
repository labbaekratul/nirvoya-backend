const express = require("express");
const sizeRouter = express.Router();
const {
  allSize,
  singleSize,
  createSize,
  updateSize,
  deleteSize,
} = require("../controllers/sizeController");

sizeRouter.get("/", allSize);
sizeRouter.get("/:id", singleSize);
sizeRouter.post("/", createSize);
sizeRouter.put("/:id", updateSize);
sizeRouter.delete("/:id", deleteSize);

module.exports = sizeRouter;

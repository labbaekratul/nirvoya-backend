const express = require("express");
const {
  allEntrepreneur,
  singleEntrepreneur,
  createEntrepreneur,
  updateEntrepreneur,
  deleteEntrepreneur,
} = require("../controllers/entrepreneurController");
const entrepreneurRouter = express.Router();

entrepreneurRouter.get("/", allEntrepreneur);
entrepreneurRouter.get("/:id", singleEntrepreneur);
entrepreneurRouter.post("/", createEntrepreneur);
entrepreneurRouter.put("/:id", updateEntrepreneur);
entrepreneurRouter.delete("/:id", deleteEntrepreneur);

module.exports = entrepreneurRouter;

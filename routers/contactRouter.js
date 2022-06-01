const express = require("express");
const contactRouter = express.Router();
const {
  allContract,
  createContract,
} = require("../controllers/contactController");

contactRouter.get("/", allContract);
contactRouter.post("/", createContract);

module.exports = contactRouter;

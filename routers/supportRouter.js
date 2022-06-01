const express = require("express");
const supportRouter = express.Router();
const {
  allSupports,
  singleUserAllSupports,
  singleSupport,
  createSupport,
  updateSupport,
  deleteSupports,
  pushComment,
  singleComment,
} = require("../controllers/supportController");

supportRouter.get("/", allSupports);
supportRouter.get("/mine", singleUserAllSupports);
supportRouter.get("/:id", singleSupport);
supportRouter.post("/", createSupport);
supportRouter.put("/:id", updateSupport);
supportRouter.put("/comment/:id", singleComment);
supportRouter.put("/:id/pushComment", pushComment);
supportRouter.delete("/:id", deleteSupports);

module.exports = supportRouter;

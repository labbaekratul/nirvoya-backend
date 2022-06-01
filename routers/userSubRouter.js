const express = require("express");
const {
  allUserSubs,
  createUserSub,
  singleUserSub,
} = require("../controllers/userSubController");
const userSubsRouter = express.Router();

userSubsRouter.get("/", allUserSubs);
userSubsRouter.get("/:id", singleUserSub);
userSubsRouter.post("/", createUserSub);
// userSubsRouter.put("/:id", updateColor);
// userSubsRouter.delete("/:id", deleteColor);

module.exports = userSubsRouter;

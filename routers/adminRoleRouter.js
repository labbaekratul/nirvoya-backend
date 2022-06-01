const express = require("express");
const {
  allRole,
  singleRole,
  createRole,
  updateRole,
  deleteRoles,
  singIn,
} = require("../controllers/adminRoleController");
const adminRouter = express.Router();

adminRouter.get("/", allRole);
adminRouter.get("/:id", singleRole);
adminRouter.post("/", createRole);
adminRouter.post("/signin", singIn);
adminRouter.put("/:id", updateRole);
adminRouter.delete("/:id", deleteRoles);

module.exports = adminRouter;

const express = require("express");
const userRouter = express.Router();
const { isAuth } = require("../middlewares/authAndValidation");

const {
  allUser,
  singleUser,
  seedInsert,
  singIn,
  updateUser,
  registration,
  deleteUsers,
  googleSignin,
  googleRegister,
  googleSignUsers,
  googleSingleUser,
  forgotPassword,
  resetPass,
} = require("../controllers/userController.js");

userRouter.get("/", allUser);
userRouter.get("/googleUsers", googleSignUsers);
userRouter.get("/:id", singleUser);
userRouter.get("/googleUsers/:id", googleSingleUser);
userRouter.get("/seed", seedInsert);
userRouter.post("/signin", singIn);
userRouter.post("/forgotPassword", forgotPassword);
userRouter.post("/register", registration);
userRouter.post("/googleSignin", googleSignin);
userRouter.post("/googleRegister", googleRegister);
userRouter.put("/:id", updateUser);
userRouter.put("/resetPass/:id", resetPass);
userRouter.delete("/:id", deleteUsers);

module.exports = userRouter;

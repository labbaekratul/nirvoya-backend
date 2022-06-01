const expressAsyncHandler = require("express-async-handler");
const UserSub = require("../models/userSubSchema");

//Get The All UserSubs
exports.allUserSubs = expressAsyncHandler(async (req, res) => {
  const userSubs = await UserSub.find({});
  res.send(userSubs);
});

//Get Single UserSubs Details
exports.singleUserSub = expressAsyncHandler(async (req, res) => {
  const userSub = await UserSub.findById(req.params.id);

  if (userSub) {
    res.send(userSub);
  } else {
    res.status(404).send({ message: "userSubs not fount" });
  }
});

//Create Single UserSub
exports.createUserSub = expressAsyncHandler(async (req, res) => {
  const userSub = new UserSub({
    name: req.body.name,
    userId: req.body.userId,
    email: req.body.email,
  });
  const createUserSub = await userSub.save();
  res.send({ message: "New userSub Created", userSub: createUserSub });
});

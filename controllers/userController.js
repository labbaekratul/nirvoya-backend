const { User, GoogleUser } = require("../models/userSchema");
const expressAsyncHandler = require("express-async-handler");
const data = require("../data.js");
const bcrypt = require("bcryptjs");
const { default: slugify } = require("slugify");
const { generateToken } = require("../middlewares/authAndValidation");
const { default: axios } = require("axios");
var unirest = require("unirest");

// Get all the User data
exports.allUser = expressAsyncHandler(async (req, res) => {
  const phone = req.query.phone || "";
  const pageSize = Number(req.query.pageSize) || 12;
  const page = Number(req.query.pageNumber) || 1;
  const phoneNumber = phone ? { phone: { $regex: phone, $options: "i" } } : {};
  const count = await User.countDocuments({ ...phoneNumber });
  const users = await User.find({ ...phoneNumber })
    .skip(pageSize * (page - 1))
    .limit(pageSize);
  res.send({ users, page, count, pages: Math.ceil(count / pageSize) });
});

// Get all the googleSignUsers data
exports.googleSignUsers = expressAsyncHandler(async (req, res) => {
  const users = await GoogleUser.find({});
  res.send(users);
});

//Single user details
exports.singleUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ message: "User not fount" });
  }
});

//Google Single user details
exports.googleSingleUser = expressAsyncHandler(async (req, res) => {
  const user = await GoogleUser.findById(req.params.id);

  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ message: "User not fount" });
  }
});

// Bulk insert data
exports.seedInsert = expressAsyncHandler(async (req, res) => {
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdUsers });
});

//Normal User SignIn
exports.singIn = expressAsyncHandler(async (req, res) => {
  const user = await User.findOne({
    $or: [{ phone: req.body.phone }, { email: req.body.email }],
  });

  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        image: user.image,
        isAdmin: user.isAdmin,
        token: generateToken(user),
      });
      return;
    }
  }

  res.status(401).send({ message: "Invalid email or password" });
});

//Google SignIn
exports.googleSignin = expressAsyncHandler(async (req, res) => {
  const user = await GoogleUser.findOne({
    $or: [{ phone: req.body.phone }, { email: req.body.email }],
  });

  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        isAdmin: user.isAdmin,
        token: generateToken(user),
      });
      return;
    }
  }
  res.status(401).send({ message: "Invalid email or password" });
});

// Forgot Password get otp
exports.forgotPassword = expressAsyncHandler(async (req, res) => {
  const user = await User.findOne({
    $or: [{ phone: req.body.phone }, { email: req.body.email }],
  });
  const dd = Math.random().toFixed(4).substr(`-${4}`);
  if (user) {
    const apiFeatch = async () => {
      const { data } = await axios.post(`http://localhost:5000/api/otpSms`, {
        token: dd,
        userId: user._id,
      });
      if (data) {
        unirest(
          "POST",
          `http://66.45.237.70/maskingapi.php?username=oikko&password=E7ZGNC4R&number=8801906682171&senderid=OIKKO&message=Code-${dd}`
        )
          .headers({
            "Content-Type": "application/json",
          })
          .send("")
          .end(function (res) {
            if (res.error) throw new Error(res.error);
          });
      }
    };
    apiFeatch();
  }
  res.send({ message: "OTP has been Created", user: user._id, opt: dd });
});

//User update data
exports.updateUser = expressAsyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (user) {
    user.name = req.body.name;
    user.image = req.body.image;
    user.email = req.body.email;
    user.phone = req.body.phone;
    user.password = bcrypt.hashSync(req.body.password, 8);
    user.gender = req.body.gender;
    user.dateOfBirth = req.body.dateOfBirth;
    user.organization = req.body.organization;
    user.occupation = req.body.occupation;
    user.address = req.body.address;
    user.role = req.body.role;
    const updatedUser = await user.save();
    res.send({ message: "User Updated", updatedUser });
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
});

//Reset Password
exports.resetPass = expressAsyncHandler(async (req, res) => {
  const passChange = await User.updateOne(
    { _id: req.params.id },
    {
      $set: {
        password: bcrypt.hashSync(req.body.password, 8),
      },
    }
  );
  if (passChange) {
    res.status(201).send({ message: "Password has been Updated", passChange });
  } else {
    res.status(404).send({ message: "Not Found" });
  }
});

//Basic User Register
exports.registration = expressAsyncHandler(async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    image: req.body.image,
    isAdmin: req.body.isAdmin,
    role: req.body.role,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  const createdUser = await user.save();
  res.send({
    _id: createdUser._id,
    name: createdUser.name,
    email: createdUser.email,
    phone: createdUser.phone,
    image: createdUser.image,
    isAdmin: createdUser.isAdmin,
    role: createdUser.role,
    token: generateToken(createdUser),
  });
});

//Google User Register
exports.googleRegister = expressAsyncHandler(async (req, res) => {
  const user = new GoogleUser({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    image: req.body.image,
    isAdmin: req.body.isAdmin,
    role: req.body.role,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  const createdUser = await user.save();
  res.send({
    _id: createdUser._id,
    name: createdUser.name,
    email: createdUser.email,
    image: createdUser.image,
    isAdmin: createdUser.isAdmin,
    role: createdUser.role,
    token: generateToken(createdUser),
  });
});

exports.deleteUsers = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    const deleteUser = await user.remove();
    res.send({ message: "User Deleted", color: deleteUser });
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
});

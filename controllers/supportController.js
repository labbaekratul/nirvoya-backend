const expressAsyncHandler = require("express-async-handler");
const Support = require("../models/supportTicketSchema");

//Get ALl The Support Tickets
exports.allSupports = expressAsyncHandler(async (req, res) => {
  const userId = req.query.userId;
  const userSuppFilter = userId ? { userId: userId } : {};
  const support = await Support.find({ ...userSuppFilter });
  res.send(support);
});

// Get All Supports By Specifit users
exports.singleUserAllSupports = expressAsyncHandler(async (req, res) => {
  const support = await Support.find({ userId: req.body.userId });
  res.send(support);
});

//Get Single Support Details
exports.singleSupport = expressAsyncHandler(async (req, res) => {
  const support = await Support.findById(req.params.id);

  if (support) {
    res.send(support);
  } else {
    res.status(404).send({ message: "support ticket not fount" });
  }
});

//Create Single Support
exports.createSupport = expressAsyncHandler(async (req, res) => {
  const support = new Support({
    userId: req.body.userId,
    subject: req.body.subject,
    problemType: req.body.problemType,
    priority: req.body.priority,
    descriptions: req.body.descriptions,
    image: req.body.image,
    status: req.body.status,
  });
  const createdSupport = await support.save();
  res.send({ message: "New Support Created", support: createdSupport });
});

//Update Single Support details
exports.updateSupport = expressAsyncHandler(async (req, res) => {
  const supportId = req.params.id;
  const support = await Support.findById(supportId);
  if (support) {
    support.subject = req.body.subject;
    support.problemType = req.body.problemType;
    support.priority = req.body.priority;
    support.description = req.body.description;
    support.image = req.body.image;
    support.status = req.body.status;
    const updatedSupport = await support.save();
    res.send({ message: "Support Updated", updatedSupport });
  } else {
    res.status(404).send({ message: "Support Not Found" });
  }
});

//Admin Replay from Dashboard
exports.singleComment = expressAsyncHandler(async (req, res) => {
  const comment = await Support.updateOne(
    { "descriptions._id": req.params.id },
    {
      $set: {
        "descriptions.$.adminName": req.body.adminName,
        "descriptions.$.adminImage": req.body.adminImage,
        "descriptions.$.adminComment": req.body.adminComment,
      },
    }
  );
  if (comment) {
    res.status(201).send({ message: "Comment Updated", comment });
  } else {
    res.status(404).send({ message: "Comment Not Found" });
  }
});

//push support comment
exports.pushComment = expressAsyncHandler(async (req, res) => {
  const supportId = req.params.id;
  const support = await Support.findById(supportId);
  if (support) {
    const descript = {
      userName: req.body.userName,
      userImage: req.body.userImage,
      userComment: req.body.userComment,
      adminName: req.body.adminName,
      adminImage: req.body.adminImage,
      adminComment: req.body.adminComment,
    };
    support.descriptions.push(descript);
    const updatedSupport = await support.save();
    res.status(201).send({
      message: "Support Recommented",
      recomment: updatedSupport,
    });
  } else {
    res.status(404).send({ message: "Support Not Found" });
  }
});

//Delete Supports
exports.deleteSupports = expressAsyncHandler(async (req, res) => {
  const support = await Support.findById(req.params.id);
  if (support) {
    const deleteSupport = await support.remove();
    res.send({ message: "Support Deleted", support: deleteSupport });
  } else {
    res.status(404).send({ message: "Support Not Found" });
  }
});

const expressAsyncHandler = require("express-async-handler");
const Contact = require("../models/contactSchema");

//Get ALL Contract Data
exports.allContract = expressAsyncHandler(async (req, res) => {
  const contacts = await Contact.find({}).sort({ createdAt: -1 });
  res.send(contacts);
});

//Create New Contract
exports.createContract = expressAsyncHandler(async (req, res) => {
  const contact = new Contact({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    message: req.body.message,
    userId: req.body.userId,
  });
  const createdContact = await contact.save();
  res.send({ message: "New contact Created", contact: createdContact });
});

const expressAsyncHandler = require("express-async-handler");
const AboutPage = require("../models/aboutPageSchema");

//Get all about page data
exports.allData = expressAsyncHandler(async (req, res) => {
  const aboutPage = await AboutPage.find({});
  res.send(aboutPage);
});

//Create New About Page
exports.createAboutPage = expressAsyncHandler(async (req, res) => {
  const aboutPage = new AboutPage({
    heading: req.body.heading,
    description: req.body.description,
    smallHeading: req.body.smallHeading,
    others: req.body.others,
  });
  const createdAboutPage = await aboutPage.save();
  res.send({
    message: "New About Page Created",
    aboutPage: createdAboutPage,
  });
});

//Update About Page
exports.updateAboutPage = expressAsyncHandler(async (req, res) => {
  const aboutPageId = req.params.id;
  const aboutPage = await AboutPage.findById(aboutPageId);
  if (aboutPage) {
    aboutPage.heading = req.body.heading;
    aboutPage.description = req.body.description;
    aboutPage.smallHeading = req.body.smallHeading;
    aboutPage.others = req.body.others;
    const updatedAboutPage = await aboutPage.save();
    res.send({ message: "AboutPage Updated", aboutPage: updatedAboutPage });
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

//Detele About Page
exports.deleteAboutPage = expressAsyncHandler(async (req, res) => {
  const aboutPage = await AboutPage.findById(req.params.id);
  if (aboutPage) {
    const deleteProduct = await AboutPage.remove();
    res.send({
      message: "About Page Info Deleted",
      aboutPage: deleteProduct,
    });
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

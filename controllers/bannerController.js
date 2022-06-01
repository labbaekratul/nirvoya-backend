const expressAsyncHandler = require("express-async-handler");
const Banner = require("../models/bannerSchema.js");

//Get all Banner data
exports.allData = expressAsyncHandler(async (req, res) => {
  const banner = await Banner.find({})
    .select("status image.data.url orderby")
    .sort({ orderby: 1 });
  res.send(banner);
});

//Get Single Banner Data
exports.singleBanner = expressAsyncHandler(async (req, res) => {
  const banner = await Banner.findById(req.params.id);

  if (banner) {
    res.send(banner);
  } else {
    res.status(404).send({ message: "Banner not fount" });
  }
});

// Create Banner
exports.createBanner = expressAsyncHandler(async (req, res) => {
  const banner = new Banner({
    title: req.body.title,
    url: req.body.url,
    image: req.body.image,
    orderby: req.body.orderby,
    status: req.body.status,
  });
  const createdBanner = await banner.save();
  res.send({ message: "New Banner Created", Banner: createdBanner });
});

//Update Banner Details
exports.updateBanner = expressAsyncHandler(async (req, res) => {
  const bannerId = req.params.id;
  const banner = await Banner.findById(bannerId);
  if (banner) {
    banner.title = req.body.title;
    banner.url = req.body.url;
    banner.image = req.body.image;
    banner.orderby = req.body.orderby;
    banner.status = req.body.status;
    const updatedBanner = await banner.save();
    res.send({ message: "Banner Updated", updatedBanner });
  } else {
    res.status(404).send({ message: "Banner Not Found" });
  }
});

//Delete Single Banner
exports.deleteBanner = expressAsyncHandler(async (req, res) => {
  const banner = await Banner.findById(req.params.id);
  if (banner) {
    const deleteBanner = await banner.remove();
    res.send({ message: "Banner Deleted", banner: deleteBanner });
  } else {
    res.status(404).send({ message: "Banner Not Found" });
  }
});

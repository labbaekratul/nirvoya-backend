const expressAsyncHandler = require("express-async-handler");
const { default: slugify } = require("slugify");
const Size = require("../models/sizeSchema");

//Get All The Size Data
exports.allSize = expressAsyncHandler(async (req, res) => {
  const size = await Size.find({}).sort({ orderby: 1 });
  res.send(size);
});

//Get Single Size Details
exports.singleSize = expressAsyncHandler(async (req, res) => {
  const size = await Size.findById(req.params.id);

  if (size) {
    res.send(size);
  } else {
    res.status(404).send({ message: "Size not fount" });
  }
});

//Create Single Size
exports.createSize = expressAsyncHandler(async (req, res) => {
  const size = new Size({
    name: req.body.name,
    slug: slugify(req.body.name),
    description: req.body.description,
    status: req.body.status,
    orderBy: req.body.orderBy,
  });
  const createdSize = await size.save();
  res.send({ message: "New size Created", size: createdSize });
});

//Update Single Size
exports.updateSize = expressAsyncHandler(async (req, res) => {
  const sizeId = req.params.id;
  const size = await Size.findById(sizeId);
  if (size) {
    size.name = req.body.name;
    size.slug = slugify(req.body.name);
    size.description = req.body.description;
    size.status = req.body.status;
    size.orderBy = req.body.orderBy;
    const updatedSize = await size.save();
    res.send({ message: "Size Updated", updatedSize });
  } else {
    res.status(404).send({ message: "Size Not Found" });
  }
});

//Delete Sizes
exports.deleteSize = expressAsyncHandler(async (req, res) => {
  const size = await Size.findById(req.params.id);
  if (size) {
    const deleteSize = await size.remove();
    res.send({ message: "Size Deleted", size: deleteSize });
  } else {
    res.status(404).send({ message: "Size Not Found" });
  }
});

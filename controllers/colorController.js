const expressAsyncHandler = require("express-async-handler");
const { default: slugify } = require("slugify");
const Color = require("../models/colorSchema");

//Get The All Colors
exports.allColors = expressAsyncHandler(async (req, res) => {
  const color = await Color.find({}).sort({ name: 1 });
  res.send(color);
});

//Get Single Color Details
exports.singleColor = expressAsyncHandler(async (req, res) => {
  const color = await Color.findById(req.params.id);

  if (color) {
    res.send(color);
  } else {
    res.status(404).send({ message: "color not fount" });
  }
});

//Create Single Color
exports.createColor = expressAsyncHandler(async (req, res) => {
  const color = new Color({
    name: req.body.name,
    slug: slugify(req.body.name),
    colorCode: req.body.colorCode,
    description: req.body.description,
    status: req.body.status,
    orderBy: req.body.orderBy,
  });
  const createdColor = await color.save();
  res.send({ message: "New color Created", color: createdColor });
});

// Update Single Color Detail
exports.updateColor = expressAsyncHandler(async (req, res) => {
  const colorId = req.params.id;
  const color = await Color.findById(colorId);
  if (color) {
    color.name = req.body.name;
    color.slug = slugify(req.body.name);
    color.colorCode = req.body.colorCode;
    color.description = req.body.description;
    color.status = req.body.status;
    color.orderBy = req.body.orderBy;
    const updatedColor = await color.save();
    res.send({ message: "Color Updated", updatedColor });
  } else {
    res.status(404).send({ message: "Color Not Found" });
  }
});

// const color = await Color.updateMany(
//   colorId,
//   {
//     $set: {
//       status: req.body.status,
//       name: req.body.name,
//       slug: slugify(req.body.slug),
//       colorCode: req.body.colorCode,
//       description: req.body.description,
//       orderBy: req.body.orderBy,
//       test: req.body.test,
//     },
//   },
//   { new: true }
// );

// res.send(color);

//Delete Colors
exports.deleteColor = expressAsyncHandler(async (req, res) => {
  const color = await Color.findById(req.params.id);
  if (color) {
    const deleteColor = await color.remove();
    res.send({ message: "Color Deleted", color: deleteColor });
  } else {
    res.status(404).send({ message: "Color Not Found" });
  }
});

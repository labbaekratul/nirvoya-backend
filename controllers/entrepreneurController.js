const expressAsyncHandler = require("express-async-handler");
const { default: slugify } = require("slugify");
const Entrepreneur = require("../models/entrepreneurSchema");

//Get All The Entrepreneur Data
exports.allEntrepreneur = expressAsyncHandler(async (req, res) => {
  const pageSize = Number(req.query.pageSize) || 12;
  const page = Number(req.query.pageNumber) || 1;
  const count = await Entrepreneur.countDocuments({});
  const entrepreneur = await Entrepreneur.find({})
    .select("name image.data.url _id")
    .skip(pageSize * (page - 1))
    .limit(pageSize);
  res.send({ entrepreneur, page, count, pages: Math.ceil(count / pageSize) });
});

//Get Single entrepreneur details data by ID
exports.singleEntrepreneur = expressAsyncHandler(async (req, res) => {
  const entrepreneur = await Entrepreneur.findById(req.params.id);

  if (entrepreneur) {
    res.send(entrepreneur);
  } else {
    res.status(404).send({ message: "Product not fount" });
  }
});

//Create Single entrepreneur
exports.createEntrepreneur = expressAsyncHandler(async (req, res) => {
  const entrepreneur = new Entrepreneur({
    name: req.body.name,
    merchantType: req.body.merchantType,
    image: req.body.image,
    description: req.body.description,
    products: req.body.products,
    email: req.body.email,
    code: req.body.code,
    slug: slugify(req.body.name + "-" + Date.now()).toLowerCase(),
    phone: req.body.phone,
    idtype: req.body.idtype,
    idNumber: req.body.idNumber,
    nidImgFrontPart: req.body.nidImgFrontPart,
    nidImgBackPart: req.body.nidImgBackPart,
    businessName: req.body.businessName,
    businessRegistrationNumber: req.body.businessRegistrationNumber,
    legalForm: req.body.legalForm,
    address: req.body.address,
    division: req.body.division,
    district: req.body.district,
    postCode: req.body.postCode,
    bankAccInfo: req.body.bankAccInfo,
    uploadBankDocuments: req.body.uploadBankDocuments,
    password: req.body.password,
    metaTitle: req.body.metaTitle,
    focusKeyword: req.body.focusKeyword,
    metaDescription: req.body.metaDescription,
    status: req.body.status,
    sellPercentage: req.body.sellPercentage,
  });
  const createdEntrepreneur = await entrepreneur.save();
  res.send({
    message: "Entrepreneur Created",
    entrepreneur: createdEntrepreneur,
  });
});

//Update Entrepreneur Details Data
exports.updateEntrepreneur = expressAsyncHandler(async (req, res) => {
  const entrepreneurId = req.params.id;
  const entrepreneur = await Entrepreneur.findById(entrepreneurId);
  if (entrepreneur) {
    entrepreneur.name = req.body.name;
    entrepreneur.merchantType = req.body.merchantType;
    entrepreneur.image = req.body.image;
    entrepreneur.description = req.body.description;
    entrepreneur.products = req.body.products;
    entrepreneur.email = req.body.email;
    entrepreneur.code = req.body.code;
    entrepreneur.phone = req.body.phone;
    entrepreneur.idtype = req.body.idtype;
    entrepreneur.idNumber = req.body.idNumber;
    entrepreneur.nidImgFrontPart = req.body.nidImgFrontPart;
    entrepreneur.nidImgBackPart = req.body.nidImgBackPart;
    entrepreneur.businessName = req.body.businessName;
    entrepreneur.businessRegistrationNumber =
      req.body.businessRegistrationNumber;
    entrepreneur.legalForm = req.body.legalForm;
    entrepreneur.address = req.body.address;
    entrepreneur.division = req.body.division;
    entrepreneur.district = req.body.district;
    entrepreneur.postCode = req.body.postCode;
    entrepreneur.bankAccInfo = req.body.bankAccInfo;
    entrepreneur.uploadBankDocuments = req.body.uploadBankDocuments;
    entrepreneur.password = req.body.password;
    entrepreneur.metaTitle = req.body.metaTitle;
    entrepreneur.focusKeyword = req.body.focusKeyword;
    entrepreneur.metaDescription = req.body.metaDescription;
    entrepreneur.slug = req.body.slug;
    entrepreneur.status = req.body.status;
    entrepreneur.sellPercentage = req.body.sellPercentage;
    const updatedEntrepreneur = await entrepreneur.save();
    res.send({
      message: "Entrepreneur Updated",
      entrepreneur: updatedEntrepreneur,
    });
  } else {
    res.status(404).send({ message: "Entrepreneur info Not Found" });
  }
});

//Delete Entrepreneur Details Data
exports.deleteEntrepreneur = expressAsyncHandler(async (req, res) => {
  const entrepreneur = await Entrepreneur.findById(req.params.id);
  if (entrepreneur) {
    const deleteEntrepreneur = await entrepreneur.remove();
    res.send({
      message: "Entrepreneur Deleted",
      entrepreneur: deleteEntrepreneur,
    });
  } else {
    res.status(404).send({ message: "Entrepreneur Not Found" });
  }
});

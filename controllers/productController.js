const expressAsyncHandler = require("express-async-handler");
const { default: slugify } = require("slugify");
const data = require("../data");
const Product = require("../models/productSchema");

//Get All The Products --
exports.allProducts = expressAsyncHandler(async (req, res) => {
  const normalProducts =
    "name _id displayImage.data.url discountPrice discount sellPrice rating numReviews productCode";
  const searchProduct =
    "name _id displayImage.data.url discountPrice discount sellPrice rating numReviews category subCategory";
  const pageSize = Number(req.query.pageSize) || 12;
  const page = Number(req.query.pageNumber) || 1;
  const name = req.query.name || "";
  const productCode = req.query.productCode || "";
  const entrepreneur = req.query.entrepreneur || "";
  const mainCategory = req.query.mainCategory || "";
  const category = req.query.category || "";
  const reviews = req.query.reviews;
  const subCategory = req.query.subCategory || "";
  const order = req.query.order || "";
  const min =
    req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
  const max =
    req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
  const rating =
    req.query.rating && Number(req.query.rating) !== 0
      ? Number(req.query.rating)
      : 0;
  const nameFilter = name ? { name: { $regex: name, $options: "i" } } : {};
  const entrepreneurFilter = entrepreneur ? { entrepreneur: entrepreneur } : {};
  const productCodeFilter = productCode ? { productCode: productCode } : {};
  const mainCategoryFilter = mainCategory
    ? { "mainCategory.mainCategoryId": mainCategory }
    : {};
  const categoryFilter = category ? { "category.categoryId": category } : {};
  const reviewFilter = reviews ? { "reviews.emailOrPhone": reviews } : {};
  const subCategoryFilter = subCategory
    ? { "subCategory.subCategoryId": subCategory }
    : {};
  const priceFilterMin = min ? { sellPrice: { $gte: min } } : {};
  const priceFilterMax = max ? { sellPrice: { $lte: max } } : {};
  const priceFilter = min && max ? { sellPrice: { $gte: min, $lte: max } } : {};
  const ratingFilter = rating ? { rating: { $gte: rating } } : {};
  const sortOrder =
    order === "lowest"
      ? { sellPrice: 1 }
      : order === "highest"
      ? { sellPrice: -1 }
      : order === "rating"
      ? { rating: -1 }
      : order === "newest"
      ? { createdAt: -1 }
      : order === "AZOrder"
      ? { name: 1 }
      : { _id: -1 }
      ? { rating: -1 }
      : { _id: -1 };

  const count = await Product.countDocuments({
    ...nameFilter,
    ...productCodeFilter,
    ...mainCategoryFilter,
    ...categoryFilter,
    ...subCategoryFilter,
    ...reviewFilter,
    ...entrepreneurFilter,
    ...priceFilterMin,
    ...priceFilterMax,
    ...priceFilter,
    ...ratingFilter,
  });

  const products = await Product.find({
    ...nameFilter,
    ...productCodeFilter,
    ...mainCategoryFilter,
    ...categoryFilter,
    ...subCategoryFilter,
    ...reviewFilter,
    ...entrepreneurFilter,
    ...priceFilterMin,
    ...priceFilterMax,
    ...priceFilter,
    ...ratingFilter,
  })
    .select(name ? searchProduct : normalProducts)
    .sort(sortOrder)
    .skip(pageSize * (page - 1))
    .limit(pageSize);
  res.send({
    products,
    page,
    count,
    pages: Math.ceil(count / pageSize),
  });
});

// Get Entrepreneur product reviews
exports.entrepreneurProductReviews = expressAsyncHandler(async (req, res) => {
  const entrepreneur = req.query.entrepreneur;
  const entrepreneurFilter = entrepreneur ? { entrepreneur: entrepreneur } : {};
  const products = await Product.find({ ...entrepreneurFilter }).select(
    "name displayImage.data.url rating numReviews reviews.name reviews.comment reviews.uploadedImage reviews.rating reviews.updatedAt"
  );
  if (products) {
    res.send(products);
  }
});

//Get Distrinc Product Code for all products
exports.distinctProductCode = expressAsyncHandler(async (req, res) => {
  const MainCategory = await Product.find().distinct("productCode");
  res.send(MainCategory);
});

//Get Distrinc Main CategoryID for all products
exports.distinctMainCate = expressAsyncHandler(async (req, res) => {
  const MainCategory = await Product.find().distinct(
    "mainCategory.mainCategoryId"
  );
  res.send(MainCategory);
});

//Get Distrinc CategoryID for all products
exports.distinctCate = expressAsyncHandler(async (req, res) => {
  const category = await Product.find().distinct("category.categoryId");
  res.send(category);
});

//Get Distrinc Sub CategoryID for all products
exports.distinctSubCate = expressAsyncHandler(async (req, res) => {
  const subCategory = await Product.find().distinct(
    "subCategory.subCategoryId"
  );
  res.send(subCategory);
});

//Get Search box api The Products
exports.searchBoxProducts = expressAsyncHandler(async (req, res) => {
  const name = req.query.name || "";
  const mainCategory = req.query.mainCategory || "";
  const nameFilter = name ? { name: { $regex: name, $options: "i" } } : {};
  const mainCategoryFilter = mainCategory
    ? { "mainCategory.mainCategoryId": mainCategory }
    : {};
  const products = await Product.find({
    ...mainCategoryFilter,
    ...nameFilter,
  }).limit(10);
  res.send(products);
});

//Home Page offer product Product Data
exports.featureProducts = expressAsyncHandler(async (req, res) => {
  const discountCounter = Number(req.query.discountCounter) || 7;
  const products = await Product.find({ discount: { $gte: 1 } })
    .select(
      "name _id displayImage.data.url discountPrice discount sellPrice rating maximumSell minimumSell"
    )
    .sort({ createdAt: -1 })
    .limit(12);
  res.send({ products, discountCounter });
});

//Product QnA list
exports.ProductQnAList = expressAsyncHandler(async (req, res) => {
  const products = await Product.find({
    quesAndAns: { $exists: true, $not: { $size: 0 } },
  });
  res.send(products);
});

//Seeding product for bulk insert
exports.seedProducts = expressAsyncHandler(async (req, res) => {
  const createProducts = await Product.insertMany(data.products);
  res.send({ createProducts });
});

//Get Single products details data by ID
exports.singleProduct = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
    .select(
      "_id name wishList slug productCode displayImage.data.url productDetailsImgs.url sellPrice costPrice entrepreneur reviews discount minimumSell maximumSell description quesAndAns shortDescription numReviews rating discountPrice"
    )
    .populate("entrepreneur", "name description image.data.url")
    .populate("mainCategory")
    .populate("category")
    .populate("subCategory");

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product not fount" });
  }
});

// admin product details routs
exports.productAdminDetails = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.paId)
    .populate("entrepreneur", "name description image.data.url")
    .populate("mainCategory")
    .populate("category")
    .populate("subCategory");

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product not fount" });
  }
});

// Create New Product
exports.createProduct = expressAsyncHandler(async (req, res) => {
  const product = new Product({
    name: req.body.name, //done
    slug: slugify(req.body.name + "-" + Date.now()).toLowerCase(),
    productCode: req.body.productCode, //done0
    mainCategory: req.body.mainCategory,
    category: req.body.category,
    subCategory: req.body.subCategory,
    displayImage: req.body.displayImage, //done
    productDetailsImgs: req.body.productDetailsImgs,
    isTrading: req.body.isTrading, //done
    sellPrice: req.body.sellPrice, //done
    costPrice: req.body.costPrice, //done
    taxPrice: req.body.taxPrice, //done
    productDisplay: req.body.productDisplay, //done
    countInStock: req.body.countInStock, //done
    color: req.body.color, //done
    material: req.body.material, //done
    model: req.body.model,
    unit: req.body.unit,
    status: req.body.status,
    callForPrice: req.body.callForPrice,
    onSale: req.body.onSale,
    isActive: req.body.isActive,
    storeOnly: req.body.storeOnly,
    requireDocuments: req.body.requireDocuments,
    size: req.body.size, //done
    feature: req.body.feature, //done
    weight: req.body.weight, //done
    tag: req.body.tag, //done
    placeOfOrigin: req.body.placeOfOrigin,
    entrepreneur: req.body.entrepreneur,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    reviews: req.body.reviews,
    warrantyType: req.body.warrantyType,
    warrantyPeriod: req.body.warrantyPeriod,
    warrantyPolicy: req.body.warrantyPolicy,
    minimumSell: req.body.minimumSell,
    maximumSell: req.body.maximumSell,
    sellPercentage: req.body.sellPercentage, //Entrepreneur
    discount: req.body.discount,
    discountPrice: req.body.discountPrice,
    discountPeriod: req.body.discountPeriod,
    description: req.body.description,
    shortDescription: req.body.shortDescription,
    shippingAndReturnPolicy: req.body.shippingAndReturnPolicy,
    videoUrl: req.body.videoUrl,
    profitMargin: req.body.profitMargin,
    wishList: req.body.wishList,
    metaTag: req.body.metaTag,
    focusKeyword: req.body.focusKeyword,
    metaDescription: req.body.metaDescription,
  });
  const createdProduct = await product.save();
  res.send({ message: "Product Created", product: createdProduct });
});

//Update Single Product Details
exports.updateProduct = expressAsyncHandler(async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    product.name = req.body.name;
    product.productCode = req.body.productCode;
    product.mainCategory = req.body.mainCategory;
    product.category = req.body.category;
    product.subCategory = req.body.subCategory;
    product.displayImage = req.body.displayImage;
    product.productDetailsImgs = req.body.productDetailsImgs;
    product.slug = req.body.slug;
    product.isTrading = req.body.isTrading;
    product.sellPrice = req.body.sellPrice;
    product.costPrice = req.body.costPrice;
    product.taxPrice = req.body.taxPrice;
    product.productDisplay = req.body.productDisplay;
    product.countInStock = req.body.countInStock;
    product.color = req.body.color;
    product.material = req.body.material;
    product.model = req.body.model;
    product.unit = req.body.unit;
    product.status = req.body.status;
    product.callForPrice = req.body.callForPrice;
    product.onSale = req.body.onSale;
    product.isActive = req.body.isActive;
    product.storeOnly = req.body.storeOnly;
    product.requireDocuments = req.body.requireDocuments;
    product.size = req.body.size;
    product.feature = req.body.feature;
    product.weight = req.body.weight;
    product.tag = req.body.tag;
    product.placeOfOrigin = req.body.placeOfOrigin;
    product.entrepreneur = req.body.entrepreneur;
    product.rating = req.body.rating;
    product.reviews = req.body.reviews;
    product.warrantyType = req.body.warrantyType;
    product.warrantyPeriod = req.body.warrantyPeriod;
    product.warrantyPolicy = req.body.warrantyPolicy;
    product.discount = req.body.discount;
    product.discountPrice = req.body.discountPrice;
    product.discountPeriod = req.body.discountPeriod;
    product.description = req.body.description;
    product.shortDescription = req.body.shortDescription;
    product.shippingAndReturnPolicy = req.body.shippingAndReturnPolicy;
    product.videoUrl = req.body.videoUrl;
    product.metaTag = req.body.metaTag;
    product.focusKeyword = req.body.focusKeyword;
    product.metaDescription = req.body.metaDescription;
    product.minimumSell = req.body.minimumSell;
    product.maximumSell = req.body.maximumSell;
    product.profitMargin = req.body.profitMargin;
    product.sellPercentage = req.body.sellPercentage;
    const updatedProduct = await product.save();
    res.send({ message: "Product Updated", product: updatedProduct });
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

//Product Reviews
exports.productReviews = expressAsyncHandler(async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    if (product.reviews.find((x) => x.name === req.body.name)) {
      return res
        .status(400)
        .send({ message: "You already submitted a review" });
    }
    const review = {
      name: req.body.name,
      rating: Number(req.body.rating),
      image: req.body.image,
      uploadedImage: req.body.uploadedImage,
      comment: req.body.comment,
      emailOrPhone: req.body.emailOrPhone,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((a, c) => c.rating + a, 0) /
      product.reviews.length;
    const updatedProduct = await product.save();
    res.status(201).send({
      message: "Review Created",
      review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
    });
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

//product user add wishlist
exports.addWishList = expressAsyncHandler(async (req, res) => {
  const productId = req.params.id;
  const wishList = req.body.wishList;
  const addWishlist = await Product.findOneAndUpdate(
    { _id: productId },
    {
      $addToSet: {
        "wishList.userWishlistId": wishList,
      },
    },
    { new: true }
  ).select("wishList");
  if (addWishlist) {
    res.status(201).send({ message: "WishList Updated", addWishlist });
  } else {
    res.status(404).send({ message: "WishList Not Found" });
  }
});

exports.removeWishList = expressAsyncHandler(async (req, res) => {
  const productId = req.params.id;
  const wishList = req.body.wishList;
  const removeWishList = await Product.findOneAndUpdate(
    { _id: productId },
    {
      $pull: {
        "wishList.userWishlistId": wishList,
      },
    },
    { new: true }
  ).select("wishList");
  if (removeWishList) {
    res
      .status(201)
      .send({ message: "Like or Dislike Updated", removeWishList });
  } else {
    res.status(404).send({ message: "Like or Dislike Not Found" });
  }
});

//WishList data Details
exports.singleProduct = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
    .select(
      "_id name wishList slug productCode displayImage.data.url productDetailsImgs.url sellPrice costPrice entrepreneur reviews discount minimumSell maximumSell description quesAndAns shortDescription numReviews rating discountPrice"
    )
    .populate("entrepreneur", "name description image.data.url")
    .populate("mainCategory")
    .populate("category")
    .populate("subCategory");

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product not fount" });
  }
});

//Product add like
exports.addLike = expressAsyncHandler(async (req, res) => {
  const productId = req.params.id;
  const likes = req.body.like;
  const like = await Product.findOneAndUpdate(
    { _id: productId },
    {
      $addToSet: {
        "like.userLikeId": like,
      },
    }
  );
  if (likes) {
    res.status(201).send({ message: "Like Updated", likes });
  } else {
    res.status(404).send({ message: "Like  Not Found" });
  }
});

//Product remove like
exports.removeLike = expressAsyncHandler(async (req, res) => {
  const productId = req.params.id;
  const like = req.body.like;
  const likes = await Product.findOneAndUpdate(
    { "reviews._id": productId },
    {
      $pull: {
        "like.userLikeId": like,
      },
    }
  );
  if (likes) {
    res.status(201).send({ message: "Like or Dislike Updated", likes });
  } else {
    res.status(404).send({ message: "Like or Dislike Not Found" });
  }
});

//Product add Dislike
exports.addDisLike = expressAsyncHandler(async (req, res) => {
  const productId = req.params.id;
  const dislike = req.body.dislike;
  const dislikes = await Product.findOneAndUpdate(
    { _id: productId },
    {
      $addToSet: {
        "dislike.userDisLikeId": dislike,
      },
    }
  );
  if (dislikes) {
    res.status(201).send({ message: "dislike Updated", dislikes });
  } else {
    res.status(404).send({ message: "dislike  Not Found" });
  }
});

//Product remove Dislike
exports.removeDisLike = expressAsyncHandler(async (req, res) => {
  const productId = req.params.id;
  const dislike = req.body.dislike;
  const dislikes = await Product.findOneAndUpdate(
    { "reviews._id": productId },
    {
      $pull: {
        "dislike.userDisLikeId": dislike,
      },
    }
  );
  if (dislikes) {
    res.status(201).send({ message: "Like or Dislike Updated", dislikes });
  } else {
    res.status(404).send({ message: "Like or Dislike Not Found" });
  }
});

//Product QnA Section
exports.productQnA = expressAsyncHandler(async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    const QnA = {
      userName: req.body.userName,
      adminName: req.body.adminName,
      userId: req.body.userId,
      question: req.body.question,
      answer: req.body.answer,
    };
    product.quesAndAns.push(QnA);
    const updatedProduct = await product.save();
    res.status(201).send({
      message: "QnA Created",
      QnA: updatedProduct,
    });
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

//Product QnA replay Section
exports.productQnARep = expressAsyncHandler(async (req, res) => {
  const comment = await Product.updateOne(
    { "quesAndAns._id": req.params.id },
    {
      $set: {
        "quesAndAns.$.adminName": req.body.adminName,
        "quesAndAns.$.answer": req.body.answer,
      },
    }
  );
  if (comment) {
    res.status(201).send({ message: "QnA Updated", comment });
  } else {
    res.status(404).send({ message: "QnA Not Found" });
  }
});

//Get product details realted products
exports.relatedProduct = expressAsyncHandler(async (req, res) => {
  const category = req.query.category || "";
  const categoryFilter = category ? { "category.categoryId": category } : {};
  const relatedProduct = await Product.find({ ...categoryFilter })
    .select(
      "name _id displayImage.data.url discountPrice discount sellPrice rating"
    )
    .sort({ createdAt: -1 })
    .limit(10);
  res.send(relatedProduct);
});

//Delete Products
exports.deleteProducts = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    const deleteProduct = await product.remove();
    res.send({ message: "Product Deleted", product: deleteProduct });
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

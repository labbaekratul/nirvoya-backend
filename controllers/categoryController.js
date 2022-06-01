const expressAsyncHandler = require("express-async-handler");
const Category = require("../models/catagorySchema");
const slugify = require("slugify");

//Get all the Category
exports.allcategory = expressAsyncHandler(async (req, res) => {
  const category = await Category.find({});
  if (category) {
    const categoryList = createCategories(category);
    res.status(200).json({ categoryList });
  }
});

//find Child-category by parentId
exports.childCategories = expressAsyncHandler(async (req, res) => {
  //http://localhost:5000/api/category/parentID?parentId=612dd42cffd83600162dcf98
  const cateParentId = req.query.parentId;
  const category = await Category.find({
    parentId: cateParentId,
  });

  if (category) {
    res.send(category);
  } else {
    res.status(404).send({ message: "Category not fount" });
  }
});

//find Child-subCategory by parentId
exports.subChildcategories = expressAsyncHandler(async (req, res) => {
  //http://localhost:5000/api/category/subparentID?subparentID=612dd42cffd83600162dcf98
  const cateParentId = req.query.subparentID;
  const category = await Category.find({
    parentId: cateParentId,
  });

  if (category) {
    res.send(category);
  } else {
    res.status(404).send({ message: "Category not fount" });
  }
});

//Single Category Details
exports.singleCategory = expressAsyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (category) {
    res.send(category);
  } else {
    res.status(404).send({ message: "Category not fount" });
  }
});

// Distinct MainCategory Details
exports.multipleMainCategory = expressAsyncHandler(async (req, res) => {
  const disMainCate = req.query.mainCateIds;
  const arrayData = disMainCate.split(",");
  const category = await Category.find({
    _id: {
      $in: arrayData,
    },
  })
    .select("name image.data.url _id")
    .limit(9);
  if (category) {
    res.send(category);
  } else {
    res.status(404).send({ message: "Categories not fount" });
  }
});

// Distinct Category Details
exports.multipleCategory = expressAsyncHandler(async (req, res) => {
  const disCate = req.query.CateIds;
  const arrayData = disCate.split(",");
  const category = await Category.find({
    _id: {
      $in: arrayData,
    },
  }).select("name _id parentId");
  if (category) {
    res.send(category);
  } else {
    res.status(404).send({ message: "Categories not fount" });
  }
});

// Distinct SubCategory Details
exports.multipleSubCategory = expressAsyncHandler(async (req, res) => {
  const disSubCate = req.query.subCateIds;
  const arrayData = disSubCate.split(",");
  const category = await Category.find({
    _id: {
      $in: arrayData,
    },
  }).select("name _id parentId");
  if (category) {
    res.send(category);
  } else {
    res.status(404).send({ message: "Categories not fount" });
  }
});

//Create Single Category
const createCategories = (category, parentId = null) => {
  const categoryList = [];
  let Category;
  if (parentId == null) {
    Category = category.filter((cat) => cat.parentId == undefined);
  } else {
    Category = category.filter((cat) => cat.parentId == parentId);
  }

  for (let cate of Category) {
    categoryList.push({
      _id: cate._id,
      parentId: cate.parentId,
      name: cate.name,
      image: cate.image,
      slug: cate.slug,
      type: cate.type,
      description: cate.description,
      metaTitle: cate.metaTitle,
      metaDescription: cate.metaDescription,
      metaKeywords: cate.metaKeywords,
      status: cate.status,
      children: createCategories(category, cate._id),
    });
  }

  return categoryList;
};

exports.createCategory = expressAsyncHandler(async (req, res) => {
  const categoryObj = {
    name: req.body.name,
    image: req.body.image,
    slug: slugify(req.body.name + "-" + Date.now()),
    type: req.body.type,
    description: req.body.description,
    metaTitle: req.body.metaTitle,
    metaDescription: req.body.metaDescription,
    metaKeywords: req.body.metaKeywords,
    status: req.body.status,
  };

  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }

  const cat = new Category(categoryObj);
  cat.save((error, category) => {
    if (error) return res.status(400).json({ error });
    if (category) {
      return res.status(201).json({ category });
    }
  });
});

//Update Single Category
exports.updateCategory = expressAsyncHandler(async (req, res) => {
  const categoryId = req.params.id;
  const category = await Category.findById(categoryId);
  if (category) {
    category.name = req.body.name;
    category.image = req.body.image;
    category.slug = slugify(req.body.name + "-" + Date.now());
    category.type = req.body.type;
    category.description = req.body.description;
    category.metaTitle = req.body.metaTitle;
    category.metaDescription = req.body.metaDescription;
    category.metaKeywords = req.body.metaKeywords;
    category.status = req.body.status;
    category.parentId = req.body.parentId;
    const updatedCategory = await category.save();
    res.send({ message: "Category Updated", updatedCategory });
  } else {
    res.status(404).send({ message: "Category Not Found" });
  }
});

//Delete categories
exports.deleteCategory = expressAsyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (category) {
    const deleteCategory = await category.remove();
    res.send({ message: "Category Deleted", category: deleteCategory });
  } else {
    res.status(404).send({ message: "Category Not Found" });
  }
});

const expressAsyncHandler = require("express-async-handler");
const BlogPage = require("../models/blogPageSchema");
const slugify = require("slugify");

//Get All The Blogs
exports.allBlogs = expressAsyncHandler(async (req, res) => {
  const pageSize = Number(req.query.pageSize) || 12;
  const page = Number(req.query.pageNumber) || 1;
  const count = await BlogPage.countDocuments({});
  const blog = await BlogPage.find({})
    .skip(pageSize * (page - 1))
    .limit(pageSize);
  res.send({
    blog,
    page,
    count,
    pages: Math.ceil(count / pageSize),
  });
});

//Get Single Blog Data
exports.singleBlog = expressAsyncHandler(async (req, res) => {
  const blog = await BlogPage.findById(req.params.id);

  if (blog) {
    res.send(blog);
  } else {
    res.status(404).send({ message: "Blog not fount" });
  }
});

//Create Single Blog
exports.createBlog = expressAsyncHandler(async (req, res) => {
  const blog = new BlogPage({
    title: req.body.title,
    slug: slugify(req.body.title),
    subtitle: req.body.subtitle,
    description: req.body.description,
    displayImage: req.body.displayImage,
    detailImages: detailImages,
    blogWritter: {
      name: req.body.blogWritter.name,
      socialLink: req.body.blogWritter.socialLink,
      email: req.body.blogWritter.email,
      writterImage: req.body.blogWritter.writterImage,
    },
    category: req.body.category,
    bestBlog: req.body.bestBlog,
    featured: req.body.featured,
    podcast: req.body.podcast,
    status: req.body.status,
  });
  const createdBlog = await blog.save();
  res.send({ message: "New blog Created", blog: createdBlog });
});

//Update Single Blog Details
exports.updateBlog = expressAsyncHandler(async (req, res) => {
  const blogId = req.params.id;
  const blog = await BlogPage.findById(blogId);
  if (blog) {
    blog.title = req.body.title;
    blog.slug = slugify(req.body.title);
    blog.subtitle = req.body.subtitle;
    blog.description = req.body.description;
    blog.image = req.body.image;
    blog.blogWritter = {
      name: req.body.blogWritter.name,
      socialLink: req.body.blogWritter.socialLink,
      email: req.body.blogWritter.email,
      writterImage: req.body.blogWritter.writterImage,
    };

    blog.category = req.body.category;
    blog.bestBlog = req.body.bestBlog;
    blog.featured = req.body.featured;
    blog.podcast = req.body.podcast;
    blog.status = req.body.status;
    const updatedBlog = await blog.save();
    res.send({ message: "Blog Updated", updatedBlog });
  } else {
    res.status(404).send({ message: "Blog Not Found" });
  }
});

//Delete Blogs
exports.deleteBlogs = expressAsyncHandler(async (req, res) => {
  const blog = await BlogPage.findById(req.params.id);
  if (blog) {
    const deleteBlog = await blog.remove();
    res.send({ message: "Blog Deleted", color: deleteBlog });
  } else {
    res.status(404).send({ message: "Blog Not Found" });
  }
});

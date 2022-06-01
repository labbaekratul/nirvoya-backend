const express = require("express");
const blogRouter = express.Router();
const {
  allBlogs,
  singleBlog,
  createBlog,
  updateBlog,
  deleteBlogs,
} = require("../controllers/blogPageController");

blogRouter.get("/", allBlogs);
blogRouter.get("/:id", singleBlog);
blogRouter.post("/", createBlog);
blogRouter.put("/:id", updateBlog);
blogRouter.delete("/:id", deleteBlogs);

module.exports = blogRouter;

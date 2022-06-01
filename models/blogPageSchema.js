const mongoose = require("mongoose");

const comments = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    comments: [
      {
        userName: { type: String, required: true },
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        comment: { type: String, required: true },
        status: { type: Boolean },
        replayComment: [
          {
            userName: { type: String, required: true },
            userId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
              required: true,
            },
            comment: { type: String, required: true },
            status: { type: Boolean },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const blogPage = new mongoose.Schema(
  {
    title: { type: String, require: true },
    slug: { type: String, require: true },
    subtitle: { type: String },
    description: { type: String },
    displayImage: { type: Object },
    detailImages: { type: Object },
    blogWritter: {
      name: { type: String },
      socialLink: { type: Array },
      email: { type: String },
      writterImage: { type: Object },
    },
    category: { type: String, require: true },
    bestBlog: { type: Number },
    featured: { type: Boolean },
    podcast: { type: String, trim: true },
    status: { type: Boolean, default: true },
    comments: [comments],
  },
  {
    timestamps: true,
  }
);

const BlogPage = mongoose.model("BlogPage", blogPage);

module.exports = BlogPage;

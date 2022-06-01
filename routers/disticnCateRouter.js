const express = require("express");
const {
  allMainDistincCate,
  allDistincCate,
  createMainDistincCate,
  allSubDistincCate,
  createDistincCate,
  createSubDistincCate,
} = require("../controllers/distinctCateController");
const distincCateRouter = express.Router();

distincCateRouter.get("/main", allMainDistincCate);
distincCateRouter.get("/cate", allDistincCate);
distincCateRouter.get("/subCate", allSubDistincCate);
distincCateRouter.post("/main", createMainDistincCate);
distincCateRouter.post("/cate", createDistincCate);
distincCateRouter.post("/subCate", createSubDistincCate);

module.exports = distincCateRouter;

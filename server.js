const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const userRouter = require("./routers/userRouter.js");
const mongoose = require("mongoose");
const productRouter = require("./routers/productRouter.js");
const categoryRouter = require("./routers/categoryRouter.js");
const entrepreneurRouter = require("./routers/entrepreneurRouter.js");
const contactRouter = require("./routers/contactRouter.js");
const orderRouter = require("./routers/orderRouter.js");
const abouPageRouter = require("./routers/aboutPageRouter.js");
const colorRouter = require("./routers/colorRouter.js");
const sizeRouter = require("./routers/sizeRouter.js");
const blogRouter = require("./routers/blogPageRouter.js");
const bannerRouter = require("./routers/bannerRouter.js");
const supportRouter = require("./routers/supportRouter.js");
const adminRouter = require("./routers/adminRoleRouter.js");
const featureCateRouter = require("./routers/featureCategoryRouter.js");
const homeCatProductsRouter = require("./routers/homeCatProdRouter.js");
const distincCateRouter = require("./routers/disticnCateRouter.js");
const userSubsRouter = require("./routers/userSubRouter.js");
const smsOtpRouter = require("./routers/otpSmsRouter.js");

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

const URI = process.env.MONGODB_URL;

mongoose.connect(
  URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB!!!");
  }
);

const PORT = process.env.PORT || 5000;

app.use("/api/user", userRouter);
app.use("/api/products", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/color", colorRouter);
app.use("/api/size", sizeRouter);
app.use("/api/entrepreneur", entrepreneurRouter);
app.use("/api/orders", orderRouter);
app.use("/api/about", abouPageRouter);
app.use("/api/blog", blogRouter);
app.use("/api/contact", contactRouter);
app.use("/api/banner", bannerRouter);
app.use("/api/support", supportRouter);
app.use("/api/admin", adminRouter);
app.use("/api/featureCategory", featureCateRouter);
app.use("/api/homePageProducts", homeCatProductsRouter);
app.use("/api/discategory", distincCateRouter);
app.use("/api/userSubs", userSubsRouter);
app.use("/api/otpSms", smsOtpRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.get("/", (req, res) => {
  res.send("application is running");
});

app.listen(PORT || 5000, () => {
  console.log(`Server is Running On ${PORT}`);
});

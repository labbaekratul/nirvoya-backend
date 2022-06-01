// const uploadRouter = require("express").Router();
// const dotenv = require("dotenv");
// const multer = require("multer");
// const multerS3 = require("multer-s3");
// const aws = require("aws-sdk");
// const { accessKeyId, secretAccessKey } = require("../config");

// dotenv.config();
// aws.config.update({
//   accessKeyId: accessKeyId,
//   secretAccessKey: secretAccessKey,
// });

// const s3 = new aws.S3();
// const storageS3 = multerS3({
//   s3,
//   bucket: `oikko-online-shopping-bangladesh`,
//   acl: "public-read",
//   contentType: multerS3.AUTO_CONTENT_TYPE,
//   key(req, file, cb) {
//     cb(null, `${file.originalname + Date.now()}`);
//   },
// });

// const uploadS3 = multer({
//   storage: storageS3,
// });

// //single product image upload api
// uploadRouter.post("/", uploadS3.single("image"), async (req, res) => {
//   const data = await req.file;

//   res.send({
//     data: {
//       url: data?.location || "",
//       key: data?.key || "",
//       bucketName: data?.bucket || "",
//     },
//   });
// });

// //single admin image upload api
// uploadRouter.post("/adminImg", uploadS3.single("admin"), async (req, res) => {
//   const data = await req.file;

//   res.send({
//     data: {
//       url: data.location,
//       key: data.key,
//       bucketName: data.bucket,
//     },
//   });
// });

// //single categoryImg image upload api
// uploadRouter.post(
//   "/categoryImg",
//   uploadS3.single("category"),
//   async (req, res) => {
//     const data = await req.file;
//     res.send({
//       data: {
//         url: data.location,
//         key: data.key,
//         bucketName: data.bucket,
//       },
//     });
//   }
// );

// //single bannerImg image upload api
// uploadRouter.post("/bannerImg", uploadS3.single("banner"), async (req, res) => {
//   const data = await req.file;
//   res.send({
//     data: {
//       url: data.location,
//       key: data.key,
//       bucketName: data.bucket,
//     },
//   });
// });

// //single entrepreneur image upload api
// uploadRouter.post(
//   "/entrepreneurImg",
//   uploadS3.single("entrepreneur"),
//   async (req, res) => {
//     const data = await req.file;
//     res.send({
//       data: {
//         url: data.location,
//         key: data.key,
//         bucketName: data.bucket,
//       },
//     });
//   }
// );

// //single entrepreneur -Nid-Front-Img image upload api
// uploadRouter.post(
//   "/entrepreneur-Nid-Front-Img",
//   uploadS3.single("entrepreneurNidFrontImg"),
//   async (req, res) => {
//     const data = await req.file;
//     res.send({
//       data: {
//         url: data.location,
//         key: data.key,
//         bucketName: data.bucket,
//       },
//     });
//   }
// );

// //single entrepreneur -Nid-Back-Img image upload api
// uploadRouter.post(
//   "/entrepreneur-Nid-Back-Img",
//   uploadS3.single("entrepreneurNidBackImg"),
//   async (req, res) => {
//     const data = await req.file;
//     res.send({
//       data: {
//         url: data.location,
//         key: data.key,
//         bucketName: data.bucket,
//       },
//     });
//   }
// );

// //single user image upload api
// uploadRouter.post("/userImg", uploadS3.single("user"), async (req, res) => {
//   const data = await req.file;
//   res.send({
//     data: {
//       url: data.location,
//       key: data.key,
//       bucketName: data.bucket,
//     },
//   });
// });

// //single user image upload api
// uploadRouter.post(
//   "/support-ticket",
//   uploadS3.single("support"),
//   async (req, res) => {
//     const data = await req.file;
//     res.send({
//       data: {
//         url: data.location,
//         key: data.key,
//         bucketName: data.bucket,
//       },
//     });
//   }
// );

// // product details multiple upload api
// uploadRouter.post(
//   "/multiple",
//   uploadS3.array("images", 15),
//   async (req, res) => {
//     const data = await req.files;
//     const newData = data.map((x) => ({
//       url: x.location,
//       key: x.key,
//       bucketName: x.bucket,
//     }));
//     res.send(newData);
//   }
// );

// // product details multiple upload api
// uploadRouter.post(
//   "/multiple-blog",
//   uploadS3.array("blog", 15),
//   async (req, res) => {
//     const data = await req.files;
//     const newData = data.map((x) => ({
//       url: x.location,
//       key: x.key,
//       bucketName: x.bucket,
//     }));
//     res.send(newData);
//   }
// );

// //delete api for aws s3 bucker
// uploadRouter.post("/delete", (req, res) => {
//   const params = {
//     Bucket: req.body.Bucket,
//     Key: req.body.Key,
//   };
//   s3.deleteObject(params, (err, data) => {
//     res.send(data);
//   });
// });

// module.exports = uploadRouter;

// require("dotenv").config();
// const express = require("express");
// const expressAsyncHandler = require("express-async-handler");
// const accountSid = process.env.accountSid;
// const authToken = process.env.authToken;
// const client = require("twilio")(accountSid, authToken);

// const smsRouter = express.Router();

// smsRouter.get(
//   "/",
//   expressAsyncHandler(async (req, res) => {
//     const name = req.query.name;
//     const orderId = req.query.orderId;
//     const sendNum = req.query.sendNum;
//     const itemName = req.query.itemName;
//     if (name && orderId && sendNum && itemName) {
//       const sms = client.messages
//         .create({
//           body: `Dear Mr. ${name}, We just ordered ${itemName}, your order Id number is ${orderId}`,
//           from: "+13187319340",
//           to: `+880${sendNum}`,
//         })
//         .then((message) => res.send(message))
//         .catch((err) => console.log(err));
//     }
//   })
// );

// module.exports = smsRouter;

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const API = process.env.API;
const Connect = () => {
  mongoose
    .connect(API)
    .then((res) => {
      console.log("Connection Successfull");
    })
    .catch((err) => {
      console.log("ERROR==> ", err);
    });
};

module.exports = Connect;

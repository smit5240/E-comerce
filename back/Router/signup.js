const express = require("express");
const Register = require("../Model/Registerschema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express();
const dotenv = require("dotenv");
dotenv.config();
const key = process.env.key;

// .............................................................................   Usr Register    ........

router.post("/register", async (req, res) => {
  const { name, email, password, contact } = req.body;
  try {
    if ((!name || !email, !password, !contact)) {
      return res
        .status(404)
        .send({ status: 404, message: "Fill All Information" });
    } else {
      const find = await Register.findOne({ email });
      if (find) {
        return res
          .status(400)
          .send({ status: 400, message: "User Allready Register" });
      } else {
        const salt = await bcrypt.genSalt(15);
        const convert = await bcrypt.hash(password, salt);
        const data = new Register({ name, email, contact, password: convert });
        await data.save();
        res
          .status(200)
          .send({ status: 200, message: "User Register SuccessFull" });
      }
    }
  } catch (error) {
    return res.status(400).send({ status: 400, message: `error==> ${error}` });
  }
});

// .................................................................................  User Login    ..........

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(404)
        .send({ status: 404, message: "fill the information" });
    } else {
      const verify = await Register.findOne({ email });
      if (verify) {
        const { email, name, _id } = verify;
        const data = { email, name, _id };
        const token = await jwt.sign(data, key);
        return res
          .status(200)
          .send({ status: 200, message: "Login Successfull", token: token });
      } else {
        return res
          .status(404)
          .send({ status: 404, message: "User Not Registed" });
      }
    }
  } catch (error) {
    return res.status(400).send({ status: 400, message: `error ==> ${error}` });
  }
});

module.exports = router;

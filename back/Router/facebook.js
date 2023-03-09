const express = require("express");
const router = express();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const key = process.env.key;
const bcrypt = require("bcrypt");
const facebook = require("../Model/Facebook");

// .............................................. facebook  sign up   .....

router.post("/fregister", async (req, res) => {
  const { name, email, contact, password, gender } = req.body;
  try {
    if (!name || !email || !contact || !password || !gender) {
      return res
        .status(404)
        .send({ status: 404, message: "Fill All Information" });
    } else {
      const find = await facebook.findOne({ email });
      if (find) {
        return res
          .status(400)
          .send({ status: 400, message: "User Allready Register" });
      } else {
        const salt = await bcrypt.genSalt(15);
        const convert = await bcrypt.hash(password, salt);
        const data = new facebook({
          name,
          email,
          contact,
          password: convert,
          gender,
        });
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

// ..........................................................................    fb   alluser     .......

router.get("/fall", async (req, res) => {
  try {
    const alluser = await facebook.find();
    res.status(200).send({ status: 200, message: alluser });
  } catch (error) {
    return res.status(400).send({ status: 400, message: `ERROR===> ${error}` });
  }
});

// ........................................................................      facebook login    ........

router.get("/flogin/:_id", async (req, res) => {
  try {
    const find = await facebook.findById(req.params._id);
    if (!find) {
      return res.status(400).send({ status: 400, message: "Enter Valide Id" });
    } else {
      const { name, email, _id } = find;
      const token = await jwt.sign({ name, email, _id }, key);
      res.status(200).send({ status: 200, message: token });
    }
  } catch (error) {
    return res.status(400).send({ status: 400, message: `error===> ${error}` });
  }
});
module.exports = router;

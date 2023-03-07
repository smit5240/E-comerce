const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const Key = process.env.Key;

const isauthicate = async (req, res, next) => {
  const token = req.header("token");
  let verify = jwt.verify(token, Key);
  //   const { _id, name, email } = verify;
  //   const data = { _id, name, email };
  req.decode = verify._id;
  next();
};

module.exports = isauthicate;

const express = require("express");
const connect = require("./Connect");
const cors = require("cors");
const App = express();

connect();
App.use(cors());
App.use(express.json());

App.use("/", require("./Router/signup"));
App.use("/", require("./Router/google"));
App.use("/", require("./Router/facebook"));
App.use("/", require("./Router/Product"));

App.listen(4200, () => {
  console.log("https://localhost:4200......");
});

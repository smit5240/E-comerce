const express = require("express");
const router = express.Router();
const Product = require("../Model/Productschema");

router.post("/addproduct", async (req, res) => {
  try {
    const { img, price, name } = req.body;
    if (!name || !price || !img) {
      return res
        .status(400)
        .send({ status: 400, message: "Fill All Product Details" });
    } else {
      const product = new Product({ img, price, name });
      product
        .save()
        .then(() => {
          res
            .status(200)
            .send({ status: 200, message: "Product save Successful" });
        })
        .catch((error) => {
          return res.status(404).send({ message: error, status: 404 });
        });
    }
  } catch (error) {
    return res.status(400).send({ status: 400, message: error });
  }
});

router.get("/allproduct", async (req, res) => {
  try {
    const all = await Product.find();
    if (all) {
      res.status(200).send({ message: all, status: 200 });
    } else {
      return res
        .status(404)
        .send({ status: 404, message: "Product Not Find " });
    }
  } catch (error) {
    return res.status(400).send({ message: error, status: 400 });
  }
});

router.get("/singleproduct/:id", async (req, res) => {
  try {
    const single = await Product.findById(req.params.id);
    if (single) {
      res.status(200).send({ message: single, status: 200 });
    } else {
      return res.status(404).send({ message: "Not Find Id", status: 404 });
    }
  } catch (error) {
    return res.status(400).send({ message: error, status: 400 });
  }
});

router.delete("/deleteproduct/:id", async (req, res) => {
  try {
    const item = await Product.findByIdAndDelete(req.params.id);
    if (item) {
      res.status(200).send({ message: "Product is Deleted", status: 200 });
    } else {
      return res.status(404).send({ status: 404, message: "EROOR.." });
    }
  } catch (error) {
    return res.status(400).send({ status: 400, message: error });
  }
});
module.exports = router;

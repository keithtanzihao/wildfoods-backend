const express = require("express");
const router = express.Router();

const { Classification, Product } = require("../../models");

router.get("/", async (req, res) => {
  const classification = await Classification.collection().fetch();
  res.status(200).send(classification.toJSON());
})

router.get("/product/:product_id", async(req, res) => {
  const classificationProduct = await Product.collection().where({
    id: req.params.product_id,
  }).fetch({
    withRelated: ["classification", "category"]
  })
  res.status(200).send(classificationProduct.toJSON());
})

module.exports = router;
const express = require("express");
const router = express.Router();

const { Product, Category } = require("../../models");

// ProductIndex
router.get("/page/:page_number", async (req, res) => {

  const product = await Product.collection().query(function(qb) {
    if (req.query.title) {
      qb.where("title", "like", `%${req.query.title}%`);
    }
    if (req.query.category_id != 0) {
      qb.where("category_id", "=", req.query.category_id);
    }

  }).fetchPage({
    pageSize: 4,
    page: req.params.page_number
  })

  console.log(product.pagination);
  console.log(req.query);


  res.status(200).send({
    product: product.toJSON(),
    pagination: product.pagination
  });
})


// ProductInfo:id
router.get("/:product_id", async(req, res) => {
  const product = await Product.collection().query(function(qb) {
    qb.where("id", "=", req.params.product_id);
  }).fetchPage({
    // If dont have nvm
    require: false,
    withRelated: ["classification", "category", "productIngredient"]
  })
  res.status(200).send(product.toJSON());
})


// Sidebar.js
router.get("/category_id/:id", async (req, res) => {
  const product = await Product.collection().query(function(qb) {
    qb.where("category_id", "=", req.params.id);
  })
  
  let searchResult = await product.fetch();
  res.status(200).send(searchResult.toJSON());
})


// ProductCarousel.js
router.get("/category_title/:title", async (req, res) => {

  const category = await Category.collection().query(function(qb) {
    qb.where("title", "=", req.params.title);
  })
  let categoryResult = await category.fetch();

  const product = await Product.collection().query(function(qb) {
    qb.where("category_id", "=", categoryResult.toJSON()[0].id);
  })
  
  let searchResult = await product.fetch();
  res.status(200).send(searchResult.toJSON());
})


module.exports = router;
const express = require("express");
const router = express.Router();

const { Category } = require("../../models");

router.get("/", async (req, res) => {
  const category = await Category.collection().fetch();
  res.status(200).send(category.toJSON());
})

router.get("/:id", async(req, res) => {
  const category = await Category.collection().query(function(qb) {
    qb.where("id", "=", req.params.id);
  }).fetch({
    require: false
  })
  res.status(200).send(category.toJSON());
})

module.exports = router;
const express = require("express");
const router = express.Router();

router.use("/admin", require("./staff"))
router.use('/cloudinary', require('./cloudinary.js'))
router.use("/admin/product", require("./product"));
router.use("/admin/category", require("./category"));
router.use("/admin/classification", require("./classification"));
router.use("/admin/productIngredient", require("./productIngredient"));
router.use("/admin/media", require("./media"));
router.use("/admin/content", require("./content"));
router.use("/admin/gift", require("./gift"));
router.use("/admin/recipie", require("./recipie"));
router.use("/admin/instruction", require("./instruction"));
router.use("/admin/recipieIngredient", require("./recipieIngredient"));
router.use("/admin/cart", require("./cart"));

module.exports = router;
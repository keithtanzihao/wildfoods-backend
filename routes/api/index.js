const express = require("express");
const router = express.Router();

router.use("/category", express.json(), require("./category"));
router.use("/classification", express.json(), require("./classification"));
router.use("/product", express.json(), require("./product"));
router.use("/user", express.json(), require("./user"));
router.use("/cart/", express.json(), require("./cart"));
router.use("/checkout/", require("./checkout"));
router.use("/order/", express.json(), require("./order"));

module.exports = router;
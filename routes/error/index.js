const express = require("express");
const router = express.Router();
const { ExpressError } = require("../../utility/expressError");

router.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
})

module.exports = router;
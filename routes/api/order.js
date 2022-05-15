const express = require("express");
const router = express.Router();

const { Cart, Order } = require("../../models");
const CartServices = require("../../services/cart_services");

const { checkIfAuthenticatedJWT } = require("../../utility");


router.post("/", async function (req, res) {
  const userCart = new CartServices(req.body.user_id);
  const cartItem = await userCart.addToCart(req.body.product_id, req.body.quantity);

  console.log(cartItem);
});



module.exports = router;

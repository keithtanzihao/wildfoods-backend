const express = require("express");
const router = express.Router();

const { Cart } = require("../../models");
const CartServices = require("../../services/cart_services");

const { checkIfAuthenticatedJWT } = require("../../utility");


router.get(
  "/user/:user_id",
  checkIfAuthenticatedJWT,
  async function (req, res) {
    const userCart = new CartServices(req.params.user_id);
    const cartItems = (await userCart.getCart()).toJSON();
    res.status(200).send(cartItems);
  }
);


router.post("/", checkIfAuthenticatedJWT, async function (req, res) {
  const userCart = new CartServices(req.body.user_id);
  const cartItem = await userCart.addToCart(
    req.body.product_id,
    req.body.quantity
  );
  res.status(200).send(cartItem);
});


router.put(
  "/user/:user_id/product/:product_id/quantity",
  checkIfAuthenticatedJWT,
  async function (req, res) {
    const userCart = new CartServices(req.params.user_id);
    const updatedCartItem = await userCart.updateQuantity(
      req.params.product_id,
      req.body.quantity
    );

    res.status(200).send(updatedCartItem);
  }
);


router.delete(
  "/user/:user_id/product/:product_id",
  checkIfAuthenticatedJWT,
  async function (req, res) {
    const userCart = new CartServices(req.params.user_id);
    const updatedCartItem = await userCart.removeFromCart(
      req.params.product_id
    );
    res.status(200).send(updatedCartItem);
  }
);


module.exports = router;

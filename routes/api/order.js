const express = require("express");
const router = express.Router();

const { Cart, Order } = require("../../models");
const OrderServices = require("../../services/order_services");
const { getStatusID, calculateCost } = require("../../dal/order_dal");

const { checkIfAuthenticatedJWT } = require("../../utility");

router.get("/user/:user_id", async function (req, res) {
  const order = new OrderServices(req.params.user_id);
  let orderItems = await order.getOrders();
  res.status(200).send(orderItems.toJSON());
});

router.post("/", async function (req, res) {
  const { order_date, order_ref, quantity, user_id, product_id } = req.body;
  const order = new OrderServices(user_id);
  let orderItems = await order.addToOrder(
    order_ref,
    order_date,
    product_id,
    quantity
  );
  res.status(200).send(orderItems.toJSON());
});

module.exports = router;

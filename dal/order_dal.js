const { Order } = require("../models");

async function getAllOrders(user_id) {
  return Order.collection().where({
    user_id: user_id
  }).fetch({
    require: false,
    withRelated:["product", "status"]
  })
}

async function getOrderByUserAndRef(user_id, order_ref) {
  return Order.where({
    user_id: user_id,
    order_ref: order_ref
  }).fetch({
    require: false,
    withRelated:["product", "status"]
  })
}

async function createOrder(order_date, order_ref, quantity, user_id, product_id) {


  let orderItem = new Order({
    user_id: user_id,
    product_id: product_id,
    quantity: quantity
  });
}
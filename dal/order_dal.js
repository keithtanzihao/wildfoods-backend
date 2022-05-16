const { Order, Status, Product } = require("../models");

async function getAllOrders(user_id) {
  return Order.collection()
    .where({
      user_id: user_id,
    })
    .fetch({
      require: false,
      withRelated: ["product", "status"],
    });
}

async function getOrderByRef(order_ref) {
  return Order.where({
    order_ref: order_ref,
  }).fetch({
    require: false,
    withRelated: ["product", "status"],
  });
}

async function getStatusID(statusTitle) {
  let status = await Status.collection()
    .where({
      title: statusTitle,
    })
    .fetch({
      require: true,
      columns: ["id"],
    });
  return status.toJSON()[0].id;
}

async function calculateCost(product_id, quantity) {
  let product = await Product.collection()
    .where({
      id: product_id,
    })
    .fetch({
      require: true,
      columns: ["price"],
    });
  return product.toJSON()[0].price * quantity;
}

async function createOrder(
  order_date,
  order_ref,
  total_cost,
  quantity,
  user_id,
  status_id,
  product_id
) {
  let orderItem = new Order({
    order_date,
    order_ref,
    total_cost,
    quantity,
    user_id,
    status_id,
    product_id,
  });
  console.log(orderItem.toJSON());
  // await orderItem.save();
  return orderItem;
}

async function removeFromOrder(order_ref) {
  let orderItem = await getOrderByRef(order_ref);
  await orderItem.destroy();
}

module.exports = {
  getAllOrders,
  getOrderByRef,
  getStatusID,
  calculateCost,
  createOrder,
  removeFromOrder,
};

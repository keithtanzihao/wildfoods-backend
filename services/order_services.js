const orderDataLayer = require("../dal/order_dal");

class OrderServices {
  constructor(user_id) {
    // this.order_date = order_date;
    // this.order_ref = order_ref;
    this.user_id = user_id;
  }

  async getOrders() {
    return orderDataLayer.getAllOrders(this.user_id);
  }

  async addToOrder(order_ref, order_date, product_id, quantity) {

    let total_cost = await orderDataLayer.calculateCost(product_id, quantity);
    let status_id =  await orderDataLayer.getStatusID("PAID");

    let orderItem = await orderDataLayer.createOrder(
      order_date,
      order_ref,
      total_cost,
      quantity,
      this.user_id,
      status_id,
      product_id
    );
    return orderItem;
  }
}

module.exports = OrderServices;

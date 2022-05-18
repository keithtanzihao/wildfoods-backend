const { Cart, Product } = require("../models");

async function getCart(user_id) {
  return Cart.collection().where({
    user_id: user_id
  }).fetch({
    require: false,
    withRelated: ["product"]
  })
}

async function getQuantity(product_id) {
  return Product.collection().query(function(qb) {
    qb.where("id", "=", product_id).column("stock");
  }).fetch({
    require: true
  })
}

async function getCartItemByUserAndProduct(user_id, product_id) {
  return Cart.where({
    user_id: user_id,
    product_id: product_id
  }).fetch({
    require: false
  })
}

async function createCartItem(user_id, product_id, quantity) {
  let cartItem = new Cart({
    user_id: user_id,
    product_id: product_id,
    quantity: quantity
  });
  await cartItem.save();
  return cartItem;
}

async function updateCartItemQuantity(user_id, product_id, quantity) {
  let cartItem = await getCartItemByUserAndProduct(user_id, product_id);
  cartItem.set('quantity', quantity);
  await cartItem.save();
  return cartItem;
}

async function removeFromCart(user_id, product_id) {
  let cartItem = await getCartItemByUserAndProduct(user_id, product_id);
  await cartItem.destroy();
}

module.exports = {
  getCart,
  getQuantity,
  createCartItem,
  getCartItemByUserAndProduct,
  updateCartItemQuantity,
  removeFromCart
}
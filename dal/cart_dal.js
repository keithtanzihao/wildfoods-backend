const { Cart } = require("../models");

async function getCart(user_id) {
  return Cart.collection().where({
    user_id: user_id
  }).fetch({
    require: false,
    withRelated: ["product"]
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
  console.log("----------- 2 -----------");
  let cartItem = await getCartItemByUserAndProduct(user_id, product_id);
  console.log("----------- 3 -----------");
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
  createCartItem,
  getCartItemByUserAndProduct,
  updateCartItemQuantity,
  removeFromCart
}
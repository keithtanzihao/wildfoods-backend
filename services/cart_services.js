const cartDataLayer = require("../dal/cart_dal");

class CartServices {
  constructor(user_id) {
    this.user_id = user_id;
  }

  async getCart() {
    return cartDataLayer.getCart(this.user_id);
  }

  async addToCart(productId, quantity) {
    // todo: check if there is enough stock
    const productQuantity = cartDataLayer.getQuantity(productId);
    console.log(productQuantity);
    // todo: check if the currently logged in user

    // have already added the item to the cart

    let cartItem = await cartDataLayer.getCartItemByUserAndProduct(
      this.user_id,
      productId
    );

    if (cartItem) {
      await cartDataLayer.updateCartItemQuantity(
        this.user_id,
        productId,
        cartItem.get("quantity") + quantity
      );
      
    } else {
      cartItem = await cartDataLayer.createCartItem(
        this.user_id,
        productId,
        quantity
      );
    }
    return cartItem;
  }

  async updateQuantity(productId, newQuantity) {
    // todo: check if enough stock exists etc.
    let updatedCartItem = await cartDataLayer.updateCartItemQuantity(
      this.user_id,
      productId,
      newQuantity
    );
    return updatedCartItem;
  }

  async removeFromCart(productId) {
    await cartDataLayer.removeFromCart(this.user_id, productId);
  }
}

module.exports = CartServices;

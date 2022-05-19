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
    const productRow = await cartDataLayer.getProduct(productId);
    console.log("productRow.getstock: " + productRow.get("stock"));
    const stock = parseInt(await productRow.get("stock"));
    if (quantity > stock) {
      return null;
    }

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
    productRow.set("stock", stock - quantity);
    await productRow.save();
    return cartItem;
  }

  async updateQuantity(productId, newQuantity) {
    // todo: check if enough stock exists etc.
    const cartItemRow = await cartDataLayer.getCartItemByUserAndProduct(this.user_id, productId);
    const productRow = await cartDataLayer.getProduct(productId);

    const stock = parseInt(await productRow.get("stock"));
    const quantity = parseInt(await cartItemRow.get("quantity"));

    if (newQuantity > quantity) {
      productRow.set("stock", stock - (newQuantity - quantity));
      await productRow.save();
    } 
    if (newQuantity < quantity) {
      productRow.set("stock", stock + (quantity - newQuantity));
      await productRow.save();
    }

    let updatedCartItem = await cartDataLayer.updateCartItemQuantity(
      this.user_id,
      productId,
      newQuantity
    );
    return updatedCartItem;
  }

  async removeFromCart(productId) {
    const cartItemRow = await cartDataLayer.getCartItemByUserAndProduct(this.user_id, productId);
    const productRow = await cartDataLayer.getProduct(productId);
    const stock = parseInt(await productRow.get("stock"));
    const quantity = parseInt(await cartItemRow.get("quantity"));
    
    productRow.set("stock", stock + quantity);
    await productRow.save();
    await cartDataLayer.removeFromCart(this.user_id, productId);
  }
}

module.exports = CartServices;

const express = require("express");
const router = express.Router();

const { User } = require("../../models");
const CartServices = require("../../services/cart_services");
const { createGetUserForm, addScssValidations } = require("../../utility/forms");

router.get("/", async function (req, res) {
  const allUser = await User.fetchAll().map((user) => {
    return [user.get("id"), user.get("email")];
  });
  const getUserForm = createGetUserForm(allUser);

  res.render("cart/index", {
    form: getUserForm.toHTML(addScssValidations),
  });
});

// router.post("/user/:user_id", async function (req, res) {

//   const allUser = await User.fetchAll().map((user) => {
//     return [user.get("id"), user.get("email")];
//   });
//   const getUserForm = createGetUserForm(allUser);

//   let cartServices = new CartServices(req.session.user.user_id);
//   const cartItems = await cartServices.getCart();
//   res.render("cart/index", {
//     form: getUserForm.toHTML(addScssValidations),
//     cartItems: cartItems.toJSON(),
//   });
// });

// router.get("/add/:product_id", async function (req, res) {
//   let cartServices = new CartServices(req.session.staff.id);
//   await cartServices.addToCart(req.params.product_id, 1);
//   res.redirect("/admin/cart");
// });

module.exports = router;

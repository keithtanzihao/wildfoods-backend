const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');

const CartServices = require("../../services/cart_services");
const Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.get("/", async (req, res) => {
  console.log("testing");
  res.status(200).send("/checkout route executed");
});

router.get("/user/:user_id", async (req, res) => {
  const cart = new CartServices(req.params.user_id);

  let cartItems = await cart.getCart();

  console.log("------ checkpoint 0");
  // Create line items
  let lineItems = [];
  let meta = [];

  // console.log(cartItems.toJSON());

  for (let item of cartItems) {
    const lineItem = {
      name: item.related("product").get("title"),
      amount: item.related("product").get("price"),
      quantity: item.attributes.quantity,
      currency: "SGD",
    };
    lineItems.push(lineItem);
    meta.push({
      product_id: item.get("product_id"),
      quantity: item.get("quantity"),
    });
  }
  console.log("------ checkpoint 2");

  // Create Stripe payment
  let metaData = JSON.stringify(meta);

  console.log("------ checkpoint 3");
  const payment = {
    // Might comment this out later.
    mode: "payment",

    // Required parameters
    success_url: process.env.STRIP_SUCCESS_URL,
    cancel_url: process.env.STRIP_CANCEL_URL,

    // Optional parameters
    client_reference_id: req.params.user_id,
    line_items: lineItems,
    metadata: {
      orders: metaData,
    },
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["SG"],
    },
  };

  // // Register session
  let stripeSession = await Stripe.checkout.sessions.create(payment);

  res.status(200).send({
    sessionID: stripeSession.id,
    stripeUrl: stripeSession.url,
  });
});

router.post(
  "/process_payment",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    let event;
    try {
      event = Stripe.webhooks.constructEvent(
        req.body,
        req.headers["stripe-signature"],
        process.env.STRIPE_ENDPOINT_SECRET
      );
    } catch (error) {
      res.status(406).send({
        error: error.message,
      });
    }
    if (event) {
      if (event.type == "checkout.session.completed") {
        let stripeSession = event.data.object;        
        console.log(stripeSession);
        console.log("--------------------------");
      }
      res.send({ received: true });
    } else {
      console.log("Event missing");
    }
  }
);

module.exports = router;

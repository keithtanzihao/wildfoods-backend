const express = require("express");
const router = express.Router();
const { Order, Status } = require("../../models");
const { createOrderForm, addScssValidations } = require("../../utility/forms");
const { checkIfAuthenticated } = require("../../utility/");
const { ExpressError, catchAsync } = require("../../utility/expressError");

router.get(
  "/",
  catchAsync(async (req, res) => {
    const allStatus = await Status.fetchAll().map((status) => {
      return { id: status.get("id"), title: status.get("title") };
    });
    allStatus.unshift({ id: 0, title: "None" });

    const order = await Order.collection().fetch({
      require: false,
      withRelated: ["product", "status", "user"],
    });

    res.render("order/index", {
      order: order.toJSON(),
      status: allStatus,
    });
  })
);

// Going rogue baby
router.post(
  "/",
  checkIfAuthenticated,
  catchAsync(async (req, res) => {
    const allStatus = await Status.fetchAll().map((status) => {
      return { id: status.get("id"), title: status.get("title") };
    });
    allStatus.unshift({ id: 0, title: "None" });

    let order = await Order.collection();

    if (req.body.title) {
      order = order.query(function (qb) {
        qb.join("product", "order.product_id", "=", "product.id").where(
          "title",
          "like",
          "%" + req.body.title + "%"
        );
      });
    }

    if (req.body.name) {
      order = order.query(function (qb) {
        qb.join("user", "order.user_id", "=", "user.id").where(
          "first_name",
          "like",
          "%" + req.body.name + "%"
        );
      });
    }

    if (req.body.status_id && req.body.status_id !== "0") {
      order = order.where("status_id", "=", req.body.status_id);
    }

    let searchResult = await order.fetch({
      withRelated: ["product", "status", "user"],
    });

    res.render("order/index", {
      order: searchResult.toJSON(),
      status: allStatus,
    });
  })
);

router.get("/:id/edit", async (req, res) => {
  const allStatus = await Status.fetchAll().map((status) => {
    return [status.get("id"), status.get("title")];
  });
  
  const order = await Order.where({
    id: req.params.id,
  }).fetch({
    require: true,
  });

  const orderForm = createOrderForm(allStatus);

  Object.keys(orderForm.fields).map((key) => {
    orderForm.fields[key].value = order.get(key);
  });

  res.render("order/edit", {
    form: orderForm.toHTML(addScssValidations),
    order: order.toJSON(),
  });
});

router.post("/:id/edit", async (req, res) => {
  const allStatus = await Status.fetchAll().map((status) => {
    return [status.get("id"), status.get("title")];
  });

  const order = await Order.where({
    id: req.params.id,
  }).fetch({
    require: true,
  });

  const orderForm = createOrderForm(allStatus);

  orderForm.handle(req, {
    success: async (form) => {
      order.set(form.data);
      order.save();
      req.flash("success", [
        {
          message: `Successfullly editted order ${req.params.id}`,
        },
      ]);
      res.redirect("/admin/order");
    },
    error: async (form) => {
      res.render("order/edit", {
        form: form.toHTML(addScssValidations),
      });
    },
  });
});

module.exports = router;

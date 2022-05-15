const express = require("express");
const router = express.Router();

const { Gift, Product } = require("../models");
const { createGiftForm, addScssValidations } = require("../utility/forms");
const { checkIfAuthenticated } = require("../utility/");

// Get all data from gift table
router.get("/", checkIfAuthenticated, async (req, res) => {
  const gift = await Gift.collection().fetch();
  res.render("gift/index", {
    gift: gift.toJSON(),
  });
});



router.get("/create", checkIfAuthenticated, async (req, res) => {
  const allProduct = await Product.fetchAll().map(
    (product) => {
      return [product.get("id"), product.get("title")];
    }
  );

  const giftForm = createGiftForm(allProduct);
  res.render("gift/create", {
    form: giftForm.toHTML(addScssValidations),
  });
});



router.post("/create", checkIfAuthenticated, async (req, res) => {
  const allProduct = await Product.fetchAll().map(product => {
    return [product.get("id"), product.get("title")];
  })

  const giftForm = createGiftForm(allProduct);
  giftForm.handle(req, {
    success: async (form) => {
      let { product, ...giftData } = form.data;
      const gift = new Gift(giftData);
      await gift.save();

      if (product) {
        await gift.product().attach(product.split(","));
      }
      req.flash("success", [{
        message: `Successfullly created a new gift`
      }]);
      res.redirect("/admin/gift");
    },
    error: async (form) => {
      res.render("gift/create", {
        form: form.toHTML(addScssValidations),
      });
    },
  });
});



router.get("/:id/edit", checkIfAuthenticated, async (req, res) => {
  const allProduct = await Product.fetchAll().map(
    (product) => {
      return [product.get("id"), product.get("title")];
    }
  );

  const gift = await Gift.where({
    id: req.params.id,
  }).fetch({
    require: true,
    withRelated: ["product"],
  });

  const giftForm = createGiftForm(allProduct);
  Object.keys(giftForm.fields).map((key) => {
    giftForm.fields[key].value = gift.get(key);
  });

  let selectedProduct = await gift.related("product").pluck("id");
  giftForm.fields.product.value = selectedProduct;
  
  res.render("gift/edit", {
    form: giftForm.toHTML(addScssValidations),
    gift: gift.toJSON(),
  });
});



router.post("/:id/edit", checkIfAuthenticated, async (req, res) => {
  const allProduct = await Product.fetchAll().map(product => {
    return [product.get("id"), product.get("title")];
  })

  const gift = await Gift.where({
    id: req.params.id,
  }).fetch({
    require: true,
  });
  const giftForm = createGiftForm(allProduct);
  giftForm.handle(req, {
    success: async (form) => {
      let { product, ...giftData } = form.data;
      gift.set(giftData)
      gift.save();

      // Gets the job done
      if (product) {
        await gift.product().detach();
        await gift.product().attach(product.split(","));
      }
      req.flash("success", [{
        message: `Successfullly editted gift ${req.params.id}`
      }]);
      res.redirect("/admin/gift");
    },
    error: async (form) => {
      res.render("gift/edit", {
        form: form.toHTML(addScssValidations),
      });
    },
  });
});



router.get("/:id/delete", checkIfAuthenticated, async (req, res) => {
  const gift = await Gift.where({
    id: req.params.id,
  }).fetch({
    require: true,
  });
  res.render("gift/delete", {
    gift: gift.toJSON(),
  });
});



router.post("/:id/delete", checkIfAuthenticated, async (req, res) => {
  const gift = await Gift.where({
    id: req.params.id,
  }).fetch({
    require: true,
  });
  await gift.destroy();
  req.flash("success", [{
    message: `Successfullly deleted gift ${req.params.id}`
  }]);
  res.redirect("/admin/gift");
});

module.exports = router;

const express = require("express");
const router = express.Router();

const { Recipie, Product } = require("../models");
const { createRecipieForm, addScssValidations } = require("../utility/forms");
const { checkIfAuthenticated } = require("../utility/");

// Get all data from recipie table
router.get("/", checkIfAuthenticated, async (req, res) => {
  const recipie = await Recipie.collection().fetch();
  res.render("recipie/index", {
    recipie: recipie.toJSON(),
  });
});



router.get("/create", checkIfAuthenticated, async (req, res) => {
  const allProduct = await Product.fetchAll().map((product) => {
    return [product.get("id"), product.get("title")];
  });

  const recipieForm = createRecipieForm(allProduct);
  res.render("recipie/create", {
    form: recipieForm.toHTML(addScssValidations),
  });
});



router.post("/create", checkIfAuthenticated, async (req, res) => {
  const allProduct = await Product.fetchAll().map((product) => {
    return [product.get("id"), product.get("title")];
  });

  const recipieForm = createRecipieForm(allProduct);
  recipieForm.handle(req, {
    success: async (form) => {
      let { product, ...recipieData } = form.data;
      const recipie = new Recipie(recipieData);
      await recipie.save();

      if (product) {
        await recipie.product().attach(product.split(","));
      }
      req.flash("success", [{
        message: `Successfullly created a new recipie`
      }]);
      res.redirect("/admin/recipie");
    },
    error: async (form) => {
      res.render("recipie/create", {
        form: form.toHTML(addScssValidations),
      });
    },
  });
});



router.get("/:id/edit", checkIfAuthenticated, async (req, res) => {
  const allProduct = await Product.fetchAll().map((product) => {
    return [product.get("id"), product.get("title")];
  });

  const recipie = await Recipie.where({
    id: req.params.id,
  }).fetch({
    require: true,
    withRelated: ["product"],
  });

  const recipieForm = createRecipieForm(allProduct);
  Object.keys(recipieForm.fields).map((key) => {
    recipieForm.fields[key].value = recipie.get(key);
  });

  let selectedProduct = await recipie.related("product").pluck("id");
  recipieForm.fields.product.value = selectedProduct;

  res.render("recipie/edit", {
    form: recipieForm.toHTML(addScssValidations),
    recipie: recipie.toJSON(),
  });
});



router.post("/:id/edit", checkIfAuthenticated, async (req, res) => {
  const recipie = await Recipie.where({
    id: req.params.id,
  }).fetch({
    require: true,
    withRelated: ["product"],
  });

  const recipieForm = createRecipieForm();
  recipieForm.handle(req, {
    success: async (form) => {
      let { product, ...recipieData } = form.data;
      recipie.set(recipieData);
      recipie.save();

      // Gets the job done
      if (product) {
        await recipie.product().detach();
        await recipie.product().attach(product.split(","));
      }
      req.flash("success", [{
        message: `Successfullly editted recipie ${req.params.id}`
      }]);
      res.redirect("/admin/recipie");
    },
    error: async (form) => {
      res.render("recipie/edit", {
        form: form.toHTML(addScssValidations),
      });
    },
  });
});



router.get("/:id/delete", checkIfAuthenticated, async (req, res) => {
  const recipie = await Recipie.where({
    id: req.params.id,
  }).fetch({
    require: true,
  });
  res.render("recipie/delete", {
    recipie: recipie.toJSON(),
  });
});



router.post("/:id/delete", checkIfAuthenticated, async (req, res) => {
  const recipie = await Recipie.where({
    id: req.params.id,
  }).fetch({
    require: true,
  });
  await recipie.destroy();
  req.flash("success", [{
    message: `Successfullly deleted recipie ${req.params.id}`
  }]);
  res.redirect("/admin/recipie");
});

module.exports = router;

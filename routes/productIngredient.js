const express = require("express");
const router = express.Router();

const { ProductIngredient } = require("../models");
const { createProductIngredientForm, addScssValidations } = require("../utility/forms");
const { checkIfAuthenticated } = require("../utility/");

// Get all data from productIngredient table
router.get("/", checkIfAuthenticated, async (req, res) => {
  const productIngredient = await ProductIngredient.collection().fetch();
  res.render("productIngredient/index", {
    productIngredient: productIngredient.toJSON(),
  });
});

router.get("/create", checkIfAuthenticated, async (req, res) => {
  const productIngredientForm = createProductIngredientForm();
  res.render("productIngredient/create", {
    form: productIngredientForm.toHTML(addScssValidations),
  });
});

router.post("/create", checkIfAuthenticated, async (req, res) => {
  const productIngredientForm = createProductIngredientForm();
  productIngredientForm.handle(req, {
    success: async (form) => {
      const productIngredient = new ProductIngredient();
      productIngredient.set("title", form.data.title);
      await productIngredient.save();
      req.flash("success", [{
        message: `Successfullly created a new product ingredient`
      }]);
      res.redirect("/admin/productIngredient");
    },
    error: async (form) => {
      res.render("productIngredient/create", {
        form: form.toHTML(addScssValidations),
      });
    },
  });
});

router.get("/:id/edit", checkIfAuthenticated, async (req, res) => {
  const productIngredient = await ProductIngredient.where({
    id: req.params.id,
  }).fetch({
    require: true,
  });
  const productIngredientForm = createProductIngredientForm();
  productIngredientForm.fields.title.value = productIngredient.get("title");
  res.render("productIngredient/edit", {
    form: productIngredientForm.toHTML(addScssValidations),
    productIngredient: productIngredient.toJSON(),
  });
});

router.post("/:id/edit", checkIfAuthenticated, async (req, res) => {
  const productIngredient = await ProductIngredient.where({
    id: req.params.id,
  }).fetch({
    require: true,
  });
  const productIngredientForm = createProductIngredientForm();
  productIngredientForm.handle(req, {
    success: async (form) => {
      productIngredient.set(form.data);
      productIngredient.save();
      req.flash("success", [{
        message: `Successfullly editted product ingredient ${req.params.id}`
      }]);
      res.redirect("/admin/productIngredient");
    },
    error: async (form) => {
      res.render("productIngredient/edit", {
        form: form.toHTML(addScssValidations),
      });
    },
  });
});

router.get("/:id/delete", checkIfAuthenticated, async (req, res) => {
  const productIngredient = await ProductIngredient.where({
    id: req.params.id,
  }).fetch({
    require: true,
  });
  res.render("productIngredient/delete", {
    productIngredient: productIngredient.toJSON(),
  });
});

router.post("/:id/delete", checkIfAuthenticated, async (req, res) => {
  const productIngredient = await ProductIngredient.where({
    id: req.params.id,
  }).fetch({
    require: true,
  });
  await productIngredient.destroy();
  req.flash("success", [{
    message: `Successfullly deleted product ingredient ${req.params.id}`
  }]);
  res.redirect("/admin/productIngredient");
});

module.exports = router;

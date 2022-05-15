const express = require("express");
const router = express.Router();

const { RecipieIngredient, Recipie } = require("../models");
const { createRecipieIngredientForm, addScssValidations } = require("../utility/forms");
const { checkIfAuthenticated } = require("../utility/");

// Get all data from recipieIngredient table
router.get("/", checkIfAuthenticated, async (req, res) => {
  const recipieIngredient = await RecipieIngredient.collection().fetch();
  res.render("recipieIngredient/index", {
    recipieIngredient: recipieIngredient.toJSON(),
  });
});



router.get("/create", checkIfAuthenticated, async (req, res) => {
  const allRecipie = await Recipie.fetchAll().map((recipie) => {
    return [recipie.get("id"), recipie.get("title")];
  });

  const recipieIngredientForm = createRecipieIngredientForm(allRecipie);
  res.render("recipieIngredient/create", {
    form: recipieIngredientForm.toHTML(addScssValidations),
  });
});



router.post("/create", checkIfAuthenticated, async (req, res) => {
  const allRecipie = await Recipie.fetchAll().map((recipie) => {
    return [recipie.get("id"), recipie.get("title")];
  });

  const recipieIngredientForm = createRecipieIngredientForm(allRecipie);
  recipieIngredientForm.handle(req, {
    success: async (form) => {
      const recipieIngredient = new RecipieIngredient(form.data);
      await recipieIngredient.save();
      req.flash("success", [{
        message: `Successfullly created a new recipie ingredient`
      }]);
      res.redirect("/admin/recipieIngredient");
    },
    error: async (form) => {
      res.render("recipieIngredient/create", {
        form: form.toHTML(addScssValidations),
      });
    },
  });
});



router.get("/:id/edit", checkIfAuthenticated, async (req, res) => {
  const allRecipie = await Recipie.fetchAll().map((recipie) => {
    return [recipie.get("id"), recipie.get("title")];
  });

  const recipieIngredient = await RecipieIngredient.where({
    id: req.params.id,
  }).fetch({
    require: true,
    withRelated: ["recipie"],
  });

  const recipieIngredientForm = createRecipieIngredientForm(allRecipie);
  Object.keys(recipieIngredientForm.fields).map((key) => {
    recipieIngredientForm.fields[key].value = recipieIngredient.get(key);
  });

  res.render("recipieIngredient/edit", {
    form: recipieIngredientForm.toHTML(addScssValidations),
    recipieIngredient: recipieIngredient.toJSON(),
  });
});



router.post("/:id/edit", checkIfAuthenticated, async (req, res) => {
  const recipieIngredient = await RecipieIngredient.where({
    id: req.params.id,
  }).fetch({
    require: true,
    withRelated: ["recipie"],
  });

  const recipieIngredientForm = createRecipieIngredientForm();
  recipieIngredientForm.handle(req, {
    success: async (form) => {
      recipieIngredient.set(form.data);
      recipieIngredient.save();
      req.flash("success", [{
        message: `Successfullly editted recipie ingredient ${req.params.id}`
      }]);
      res.redirect("/admin/recipieIngredient");
    },
    error: async (form) => {
      res.render("recipieIngredient/edit", {
        form: form.toHTML(addScssValidations),
      });
    },
  });
});



router.get("/:id/delete", checkIfAuthenticated, async (req, res) => {
  const recipieIngredient = await RecipieIngredient.where({
    id: req.params.id,
  }).fetch({
    require: true,
  });
  res.render("recipieIngredient/delete", {
    recipieIngredient: recipieIngredient.toJSON(),
  });
});



router.post("/:id/delete", checkIfAuthenticated, async (req, res) => {
  const recipieIngredient = await RecipieIngredient.where({
    id: req.params.id,
  }).fetch({
    require: true,
  });
  await recipieIngredient.destroy();
  req.flash("success", [{
    message: `Successfullly deleted recipie ingredient ${req.params.id}`
  }]);
  res.redirect("/admin/recipieIngredient");
});

module.exports = router;
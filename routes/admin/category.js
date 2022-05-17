const express = require("express");
const router = express.Router();
const { Category } = require("../../models");
const { createCategoryForm, addScssValidations } = require("../../utility/forms");
const { checkIfAuthenticated } = require("../../utility/");
const { ExpressError, catchAsync } = require("../../utility/expressError");

router.get("/", checkIfAuthenticated, catchAsync(async (req, res) => {
  const category = await Category.collection().fetch();
  res.render("category/index", {
    category: category.toJSON(),
  });
}));

router.get("/create", checkIfAuthenticated, catchAsync(async (req, res) => {
  const categoryForm = createCategoryForm();
  res.render("category/create", {
    form: categoryForm.toHTML(addScssValidations),
  });
}));

router.post("/create", checkIfAuthenticated, catchAsync(async (req, res) => {
  const categoryForm = createCategoryForm();
  categoryForm.handle(req, {
    success: async (form) => {
      const category = new Category();
      category.set("title", form.data.title);
      await category.save();
      req.flash("success", [{
        message: `Successfullly create a new category`
      }]);
      res.redirect("/admin/category");
    },
    error: async (form) => {
      res.render("category/create", {
        form: form.toHTML(addScssValidations),
      });
    },
  });
}));

router.get("/:id/edit", checkIfAuthenticated, catchAsync(async (req, res) => {
  const category = await Category.where({
    id: req.params.id,
  }).fetch({
    require: true,
  });
  const categoryForm = createCategoryForm();
  categoryForm.fields.title.value = category.get("title");
  res.render("category/edit", {
    form: categoryForm.toHTML(addScssValidations),
    category: category.toJSON(),
  });

}));

router.post("/:id/edit", checkIfAuthenticated, catchAsync(async (req, res) => {
  const category = await Category.where({
    id: req.params.id,
  }).fetch({
    require: true,
  });
  const categoryForm = createCategoryForm();
  categoryForm.handle(req, {
    success: async (form) => {
      category.set(form.data);
      category.save();
      req.flash("success", [{
        message: `Successfullly editted category ${req.params.id}`
      }]);
      res.redirect("/admin/category");
    },
    error: async (form) => {
      res.render("category/edit", {
        form: form.toHTML(addScssValidations),
      });
    },
  });
}));

router.get("/:id/delete", checkIfAuthenticated, catchAsync(async (req, res) => {
  const category = await Category.where({
    id: req.params.id,
  }).fetch({
    require: true,
  });
  res.render("category/delete", {
    category: category.toJSON(),
  });
}));

router.post("/:id/delete", checkIfAuthenticated, catchAsync(async (req, res) => {
  const category = await Category.where({
    id: req.params.id,
  }).fetch({
    require: true,
  });
  await category.destroy();
  req.flash("success", [{
    message: `Successfullly deleted category ${req.params.id}`
  }]);
  res.redirect("/admin/category");
}));

module.exports = router;

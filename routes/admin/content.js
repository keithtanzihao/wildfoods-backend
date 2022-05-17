const express = require("express");
const router = express.Router();

const { Content, Product } = require("../../models");
const { createContentForm, addScssValidations } = require("../../utility/forms");
const { checkIfAuthenticated } = require("../../utility");
const { ExpressError, catchAsync } = require("../../utility/expressError");

// Get all data from content table
router.get("/", checkIfAuthenticated, catchAsync(async (req, res) => {
  const content = await Content.collection().fetch();
  res.render("content/index", {
    content: content.toJSON(),
  });
}));

router.get("/create", checkIfAuthenticated, catchAsync(async (req, res) => {
  const allProduct = await Product.fetchAll().map(product => {
    return [product.get("id"), product.get("title")];
  })

  const contentForm = createContentForm(allProduct);
  res.render("content/create", {
    form: contentForm.toHTML(addScssValidations),
  });
}));

router.post("/create", checkIfAuthenticated, catchAsync(async (req, res) => {
  const allProduct = await Product.fetchAll().map(product => {
    return [product.get("id"), product.get("title")];
  })

  const contentForm = createContentForm(allProduct);
  contentForm.handle(req, {
    success: async (form) => {
      const content = new Content(form.data);
      await content.save();
      req.flash("success", [{
        message: `Successfullly created a new content`
      }]);
      res.redirect("/admin/content");
    },
    error: async (form) => {
      res.render("content/create", {
        form: form.toHTML(addScssValidations),
      });
    },
  });
}));

router.get("/:id/edit", checkIfAuthenticated, catchAsync(async (req, res) => {
  const allProduct = await Category.fetchAll().map(product => {
    return [product.get("id"), product.get("title")];
  })

  const content = await Content.where({
    id: req.params.id,
  }).fetch({
    require: true,
  });

  const contentForm = createContentForm(allProduct);
  Object.keys(productForm.fields).map(key => {
    productForm.fields[key].value = product.get(key);
  })
  
  res.render("content/edit", {
    form: contentForm.toHTML(addScssValidations),
    content: content.toJSON(),
  });
}));

router.post("/:id/edit", checkIfAuthenticated, catchAsync(async (req, res) => {
  const content = await Content.where({
    id: req.params.id,
  }).fetch({
    require: true,
  });
  const contentForm = createContentForm();
  contentForm.handle(req, {
    success: async (form) => {
      content.set(form.data);
      content.save();
      req.flash("success", [{
        message: `Successfullly editted content ${req.params.id}`
      }]);
      res.redirect("/admin/content");
    },
    error: async (form) => {
      res.render("content/edit", {
        form: form.toHTML(addScssValidations),
      });
    },
  });
}));

router.get("/:id/delete", checkIfAuthenticated, catchAsync(async (req, res) => {
  const content = await Content.where({
    id: req.params.id,
  }).fetch({
    require: true,
  });
  res.render("content/delete", {
    content: content.toJSON(),
  });
}));

router.post("/:id/delete", checkIfAuthenticated, catchAsync(async (req, res) => {
  const content = await Content.where({
    id: req.params.id,
  }).fetch({
    require: true,
  });
  await content.destroy();
  req.flash("success", [{
    message: `Successfullly deleted content ${req.params.id}`
  }]);
  res.redirect("/admin/content");
}));

module.exports = router;

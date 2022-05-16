const express = require("express");
const router = express.Router();

const { Classification } = require("../../models");
const { createClassificationForm, addScssValidations } = require("../../utility/forms");
const { checkIfAuthenticated } = require("../../utility/");

// Get all data from classification table
router.get("/", checkIfAuthenticated, async (req, res) => {
  const classification = await Classification.collection().fetch();
  res.render("classification/index", {
    classification: classification.toJSON(),
  });
});

router.get("/create", checkIfAuthenticated, async (req, res) => {
  const classificationForm = createClassificationForm();
  res.render("classification/create", {
    form: classificationForm.toHTML(addScssValidations),
  });
});

router.post("/create", checkIfAuthenticated, async (req, res) => {
  const classificationForm = createClassificationForm();
  classificationForm.handle(req, {
    success: async (form) => {
      const classification = new Classification();
      classification.set("title", form.data.title);
      await classification.save();
      req.flash("success", [{
        message: `Successfullly created a new classification`
      }]);
      res.redirect("/admin/classification");
    },
    error: async (form) => {
      res.render("classification/create", {
        form: form.toHTML(addScssValidations),
      });
    },
  });
});

router.get("/:id/edit", checkIfAuthenticated, async (req, res) => {
  const classification = await Classification.where({
    id: req.params.id,
  }).fetch({
    require: true,
  });
  const classificationForm = createClassificationForm();
  classificationForm.fields.title.value = classification.get("title");
  res.render("classification/edit", {
    form: classificationForm.toHTML(addScssValidations),
    classification: classification.toJSON(),
  });
});

router.post("/:id/edit", checkIfAuthenticated, async (req, res) => {
  const classification = await Classification.where({
    id: req.params.id,
  }).fetch({
    require: true,
  });
  const classificationForm = createClassificationForm();
  classificationForm.handle(req, {
    success: async (form) => {
      classification.set(form.data);
      classification.save();
      req.flash("success", [{
        message: `Successfullly editted classification ${req.params.id}`
      }]);
      res.redirect("/admin/classification");
    },
    error: async (form) => {
      res.render("classification/edit", {
        form: form.toHTML(addScssValidations),
      });
    },
  });
});

router.get("/:id/delete", checkIfAuthenticated, async (req, res) => {
  const classification = await Classification.where({
    id: req.params.id,
  }).fetch({
    require: true,
  });
  res.render("classification/delete", {
    classification: classification.toJSON(),
  });
});

router.post("/:id/delete", checkIfAuthenticated, async (req, res) => {
  const classification = await Classification.where({
    id: req.params.id,
  }).fetch({
    require: true,
  });
  await classification.destroy();
  req.flash("success", [{
    message: `Successfullly deleted classification ${req.params.id}`
  }]);
  res.redirect("/admin/classification");
});

module.exports = router;

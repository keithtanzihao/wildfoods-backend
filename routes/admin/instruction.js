const express = require("express");
const router = express.Router();
const { Instruction, Recipie } = require("../../models");
const { createInstructionForm, addScssValidations } = require("../../utility/forms");
const { checkIfAuthenticated } = require("../../utility");


router.get("/", checkIfAuthenticated, async (req, res) => {
  const instruction = await Instruction.collection().fetch();
  res.render("instruction/index", {
    instruction: instruction.toJSON(),
  });
});


router.get("/create", checkIfAuthenticated, async (req, res) => {
  const allRecipie = await Recipie.fetchAll().map((recipie) => {
    return [recipie.get("id"), recipie.get("title")];
  });
  const instructionForm = createInstructionForm(allRecipie);
  res.render("instruction/create", {
    form: instructionForm.toHTML(addScssValidations),
  });
});


router.post("/create", checkIfAuthenticated, async (req, res) => {
  const allRecipie = await Recipie.fetchAll().map((recipie) => {
    return [recipie.get("id"), recipie.get("title")];
  });
  const instructionForm = createInstructionForm(allRecipie);
  instructionForm.handle(req, {
    success: async (form) => {
      const instruction = new Instruction(form.data);
      await instruction.save();
      req.flash("success", [{
        message: `Successfullly created a new instruction`
      }]);
      res.redirect("/admin/instruction");
    },
    error: async (form) => {
      res.render("instruction/create", {
        form: form.toHTML(addScssValidations),
      });
    },
  });
});


router.get("/:id/edit", checkIfAuthenticated, async (req, res) => {
  const allRecipie = await Recipie.fetchAll().map((recipie) => {
    return [recipie.get("id"), recipie.get("title")];
  });
  const instruction = await Instruction.where({
    id: req.params.id,
  }).fetch({
    require: true,
    withRelated: ["recipie"],
  });
  const instructionForm = createInstructionForm(allRecipie);
  Object.keys(instructionForm.fields).map((key) => {
    instructionForm.fields[key].value = instruction.get(key);
  });
  res.render("instruction/edit", {
    form: instructionForm.toHTML(addScssValidations),
    instruction: instruction.toJSON(),
  });
});


router.post("/:id/edit", checkIfAuthenticated, async (req, res) => {
  const instruction = await Instruction.where({
    id: req.params.id,
  }).fetch({
    require: true,
    withRelated: ["recipie"],
  });
  const instructionForm = createInstructionForm();
  instructionForm.handle(req, {
    success: async (form) => {
      instruction.set(form.data);
      instruction.save();
      req.flash("success", [{
        message: `Successfullly editted instruction ${req.params.id}`
      }]);
      res.redirect("/admin/instruction");
    },
    error: async (form) => {
      res.render("instruction/edit", {
        form: form.toHTML(addScssValidations),
      });
    },
  });
});


router.get("/:id/delete", checkIfAuthenticated, async (req, res) => {
  const instruction = await Instruction.where({
    id: req.params.id,
  }).fetch({
    require: true,
  });
  res.render("instruction/delete", {
    instruction: instruction.toJSON(),
  });
});


router.post("/:id/delete", checkIfAuthenticated, async (req, res) => {
  const instruction = await Instruction.where({
    id: req.params.id,
  }).fetch({
    require: true,
  });
  await instruction.destroy();
  req.flash("success", [{
    message: `Successfullly deleted instruction ${req.params.id}`
  }]);
  res.redirect("/admin/instruction");
});


module.exports = router;

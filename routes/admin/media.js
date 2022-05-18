const express = require("express");
const router = express.Router();
const { Media, Product } = require("../../models");
const { createMediaForm, addScssValidations } = require("../../utility/forms");


router.get("/", async (req, res) => {
  const media = await Media.collection().fetch();
  res.render("media/index", {
    media: media.toJSON(),
  });
});


router.get("/create", async (req, res) => {
  const allProduct = await Product.fetchAll().map((product) => {
    return [product.get("id"), product.get("title")];
  });
  const mediaForm = createMediaForm(allProduct);
  res.render("media/create", {
    form: mediaForm.toHTML(addScssValidations),
    cloudinaryName: process.env.CLOUDINARY_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryPreset: process.env.CLOUDINARY_UPLOAD_PRESET,
    uploadCareKey: process.env.UPLOADCARE_KEY
  });
});


router.post("/create",  async (req, res) => {
  const allProduct = await Product.fetchAll().map((product) => {
    return [product.get("id"), product.get("title")];
  });
  const mediaForm = createMediaForm(allProduct);
  mediaForm.handle(req, {
    success: async (form) => {
      const media = new Media(form.data);
      await media.save();
      req.flash("success", [
        {
          message: `Successfullly added a new media`,
        },
      ]);
      res.redirect("/admin/media");
    },
    error: async (form) => {
      res.render("media/create", {
        form: form.toHTML(addScssValidations),
      });
    },
  });
});


router.get("/:id/update", async (req, res) => {
  const allProduct = await Product.fetchAll().map((product) => {
    return [product.get("id"), product.get("title")];
  });
  const media = await Media.where({
    id: req.params.id,
  }).fetch({
    require: true,
  });
  const mediaForm = createMediaForm(allProduct);
  mediaForm.set(form.data);
  res.render("products/update", {
    form: mediaForm.toHTML(allProduct),
    product: media.toJSON(),
    cloudinaryName: process.env.CLOUDINARY_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryPreset: process.env.CLOUDINARY_UPLOAD_PRESET,
  });
});


module.exports = router;

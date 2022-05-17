const express = require("express");
const router = express.Router();

const {
  Product,
  Category,
  Classification,
  ProductIngredient,
  Cart,
  Order
} = require("../../models");

const {
  createProductForm,
  searchProductForm,
  addScssValidations,
  addScssValidationsSearch,
} = require("../../utility/forms");
const { checkIfAuthenticated } = require("../../utility/");
const { ExpressError, catchAsync } = require("../../utility/expressError");


router.get("/", checkIfAuthenticated, catchAsync(async (req, res) => {
  const allCategory = await Category.fetchAll().map((category) => {
    return { id: category.get("id"), title: category.get("title") };
  });
  allCategory.unshift({ id: 0, title: "None" });

  const allClassification = await Classification.fetchAll().map(
    (classification) => {
      return {
        id: classification.get("id"),
        title: classification.get("title"),
      };
    }
  );

  let product = await Product.collection().fetch();
  res.render("product/index", {
    product: product.toJSON(),
    category: allCategory,
    classification: allClassification,
  });
}));

// Going rogue baby
router.post("/", checkIfAuthenticated, catchAsync(async (req, res) => {
  const allCategory = await Category.fetchAll().map((category) => {
    return { id: category.get("id"), title: category.get("title") };
  });
  allCategory.unshift({ id: 0, title: "None" });

  const allClassification = await Classification.fetchAll().map(
    (classification) => {
      return {
        id: classification.get("id"),
        title: classification.get("title"),
      };
    }
  );

  let product = await Product.collection();

  if (req.body.title) {
    product = product.where("title", "like", "%" + req.body.title + "%");
  }
  if (req.body.category_id && req.body.category_id !== "0") {
    product = product.where("category_id", "=", req.body.category_id);
  }
  if (req.body.classification_id) {
    product = product.query(function (qb) {
      qb.join(
        "classification_product",
        "product.id",
        "=",
        "classification_product.product_id"
      ).where("classification_product.classification_id", "in", [
        ...req.body.classification_id,
      ]);
    });
  }
  if (req.body.stock && req.body.stock === "Available") {
    product = product.where("stock", ">", 0);
  }
  if (req.body.stock && req.body.stock === "No Stock") {
    product= product.where("stock", "<=", 0);
  }

  if (req.body.min_fat) {
    product = product.where("fat", ">=", req.body.min_fat);
  }
  if (req.body.max_fat) {
    product = product.where("fat", "<=", req.body.max_fat);
  }

  if (req.body.min_sfat) {
    product = product.where("saturated_fat", ">=", req.body.min_sfat);
  }
  if (req.body.max_sfat) {
    product = product.where("saturated_fat", "<=", req.body.max_sfat);
  }

  if (req.body.min_carbs) {
    product = product.where("carbohydrates", ">=", req.body.min_carbs);
  }
  if (req.body.max_carbs) {
    product = product.where("carbohydrates", "<=", req.body.max_carbs);
  }

  




  let searchResult = await product.fetch();

  res.render("product/index", {
    product: searchResult.toJSON(),
    category: allCategory,
    classification: allClassification,
  });
}));

router.get("/create", checkIfAuthenticated, catchAsync(async (req, res) => {
  const allCategory = await Category.fetchAll().map((category) => {
    return [category.get("id"), category.get("title")];
  });

  const allClassification = await Classification.fetchAll().map(
    (classification) => {
      return [classification.get("id"), classification.get("title")];
    }
  );

  const allProductIngredient = await ProductIngredient.fetchAll().map(
    (productIngredient) => {
      return [productIngredient.get("id"), productIngredient.get("title")];
    }
  );

  const productForm = createProductForm(
    allCategory,
    allClassification,
    allProductIngredient
  );
  res.render("product/create", {
    form: productForm.toHTML(addScssValidations),
    cloudinaryName: process.env.CLOUDINARY_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryPreset: process.env.CLOUDINARY_UPLOAD_PRESET,
    uploadCareKey: process.env.UPLOADCARE_KEY,
  });
}));

router.post("/create", checkIfAuthenticated, catchAsync(async (req, res) => {
  const allCategory = await Category.fetchAll().map((category) => {
    return [category.get("id"), category.get("title")];
  });
  const allClassification = await Classification.fetchAll().map(
    (classification) => {
      return [classification.get("id"), classification.get("title")];
    }
  );
  const allProductIngredient = await ProductIngredient.fetchAll().map(
    (productIngredient) => {
      return [productIngredient.get("id"), productIngredient.get("title")];
    }
  );

  const productForm = createProductForm(
    allCategory,
    allClassification,
    allProductIngredient
  );
  productForm.handle(req, {
    success: async (form) => {
      let { classification, productIngredient, ...productData } = form.data;
      const product = new Product(productData);
      await product.save();

      if (classification) {
        await product.classification().attach(classification.split(","));
      }

      if (productIngredient) {
        await product.productIngredient().attach(productIngredient.split(","));
      }
      req.flash("success", [
        {
          message: `Successfullly created a new product`,
        },
      ]);
      res.redirect("/admin/product");
    },
    error: async (form) => {
      res.render("product/create", {
        form: form.toHTML(addScssValidations),
        cloudinaryName: process.env.CLOUDINARY_NAME,
        cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
        cloudinaryPreset: process.env.CLOUDINARY_UPLOAD_PRESET,
        uploadCareKey: process.env.UPLOADCARE_KEY,
      });
    },
  });
}));

router.get("/:id/edit", checkIfAuthenticated, catchAsync(async (req, res) => {
  const allCategory = await Category.fetchAll().map((category) => {
    return [category.get("id"), category.get("title")];
  });
  const allClassification = await Classification.fetchAll().map(
    (classification) => {
      return [classification.get("id"), classification.get("title")];
    }
  );
  const allProductIngredient = await ProductIngredient.fetchAll().map(
    (productIngredient) => {
      return [productIngredient.get("id"), productIngredient.get("title")];
    }
  );

  const product = await Product.where({
    id: req.params.id,
  }).fetch({
    require: true,
    withRelated: ["productIngredient"],
  });

  const productForm = createProductForm(
    allCategory,
    allClassification,
    allProductIngredient
  );
  Object.keys(productForm.fields).map((key) => {
    productForm.fields[key].value = product.get(key);
  });

  let selectedClassifcation = await product
    .related("classification")
    .pluck("id");
  productForm.fields.classification.value = selectedClassifcation;

  let selectedIngredient = await product
    .related("productIngredient")
    .pluck("id");
  productForm.fields.productIngredient.value = selectedIngredient;

  res.render("product/edit", {
    form: productForm.toHTML(addScssValidations),
    product: product.toJSON(),
  });
}));

router.post("/:id/edit", checkIfAuthenticated, catchAsync(async (req, res) => {
  const allCategory = await Category.fetchAll().map((category) => {
    return [category.get("id"), category.get("title")];
  });
  const allClassification = await Classification.fetchAll().map(
    (classification) => {
      return [classification.get("id"), classification.get("title")];
    }
  );
  const allProductIngredient = await ProductIngredient.fetchAll().map(
    (productIngredient) => {
      return [productIngredient.get("id"), productIngredient.get("title")];
    }
  );

  const product = await Product.where({
    id: req.params.id,
  }).fetch({
    require: true,
    withRelated: ["productIngredient"],
  });

  const productForm = createProductForm(
    allCategory,
    allClassification,
    allProductIngredient
  );
  productForm.handle(req, {
    success: async (form) => {
      let { classification, productIngredient, ...productData } = form.data;
      console.log(form.data);
      product.set(productData);
      product.save();

      // Gets the job done
      if (classification) {
        await product.classification().detach();
        await product.classification().attach(classification.split(","));
      }

      if (productIngredient) {
        await product.productIngredient().detach();
        await product.productIngredient().attach(productIngredient.split(","));
      }
      req.flash("success", [
        {
          message: `Successfullly editted product ${req.params.id}`,
        },
      ]);
      res.redirect("/admin/product");
    },
    error: async (form) => {
      res.render("product/edit", {
        form: form.toHTML(addScssValidations),
      });
    },
  });
}));

router.get("/:id/delete", checkIfAuthenticated, catchAsync(async (req, res) => {
  const product = await Product.where({
    id: req.params.id,
  }).fetch({
    require: true,
  });

  const cart = await Cart.where({
    product_id: req.params.id,
  }).fetch({
    require: false,
  })

  const order = await Order.where({
    product_id: req.params.id,
  }).fetch({
    require: false,
  })

  if (cart !== null || order !== null) {
    req.flash("error", [
      {
        message: `Error: Product exist in either Cart / Order`,
      },
    ]);
    res.redirect("/admin/product");

  } else {
    res.render("product/delete", {
      product: product.toJSON(),
    });
  }

  
}));

router.post("/:id/delete", checkIfAuthenticated, catchAsync(async (req, res) => {
  const product = await Product.where({
    id: req.params.id,
  }).fetch({
    require: true,
  });
  await product.destroy();
  req.flash("success", [
    {
      message: `Successfullly deleted product ${req.params.id}`,
    },
  ]);
  res.redirect("/admin/product");
}));

module.exports = router;

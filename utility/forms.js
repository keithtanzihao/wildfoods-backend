const forms = require("forms");
const fields = forms.fields;
const validators = forms.validators;

const addScssValidations = function (name, object) {
  var label = object.labelHTML(name);
  var error = object.error
    ? '<div class="form__errorMsg">' + object.error + "</div>"
    : "";

  if (object.value && !object.error) {
    object.widget.classes.push("form__success");
  } else if (object.error) {
    object.widget.classes.push("form__failure");
  }
  var widget = object.widget.toHTML(name, object);
  return '<div class="form__ctn">' + label + widget + error + "</div>";
};


const addScssValidationsSearch = function (name, object) {
  var label = object.labelHTML(name);
  var error = object.error
    ? '<div class="form__errorMsg">' + object.error + "</div>"
    : "";

  if (object.value && !object.error) {
    object.widget.classes.push("form__success");
  } else if (object.error) {
    object.widget.classes.push("form__failure");
  }
  var widget = object.widget.toHTML(name, object);
  return '<div class="form__ctn--search">' + label + widget + error + "</div>";
};


const createProductForm = (category, classification, productIngredient) => {
  return forms.create({
    title: fields.string({
      required: true,
      errorAfterField: true,
      validators: [validators.minlength(5), validators.maxlength(50)],
      cssClasses: {
        label: ["form__label"],
      },
      widget: forms.widgets.text({
        classes: ["form__input--textNum"],
      }),
    }),
    stock: fields.number({
      required: true,
      errorAfterField: true,
      validators: [validators.min(0), validators.integer()],
      cssClasses: {
        label: ["form__label"],
      },
      widget: forms.widgets.number({
        classes: ["form__input--textNum"],
      }),
    }),
    description: fields.string({
      required: true,
      errorAfterField: true,
      validators: [validators.minlength(1), validators.maxlength(300)],
      cssClasses: {
        label: ["form__label"],
      },
      widget: forms.widgets.textarea({
        classes: ["form__input--textNum"],
      }),
    }),
    category_id: fields.string({
      required: true,
      errorAfterField: true,
      validators: [validators.required()],
      cssClasses: {
        label: ["form__label"],
      },
      widget: forms.widgets.select({
        classes: ["form__input--select"],
      }),
      choices: category
    }),
    classification: fields.string({
      required: true,
      errorAfterField: true,
      validators: [validators.required()],
      cssClasses: {
        label: ["form__label"],
      },
      widget: forms.widgets.multipleSelect({
        classes: ["form__input--select"],
      }),
      choices: classification
    }),
    productIngredient: fields.string({
      required: true,
      errorAfterField: true,
      validators: [validators.required()],
      cssClasses: {
        label: ["form__label"],
      },
      widget: forms.widgets.multipleSelect({
        classes: ["form__input--select"],
      }),
      choices: productIngredient
    }),
    price: fields.number({
      required: true,
      errorAfterField: true,
      validators: [validators.min(0), validators.integer()],
      cssClasses: {
        label: ["form__label"],
      },
      widget: forms.widgets.number({
        classes: ["form__input--textNum"],
      }),
    }),
    weight: fields.number({
      required: true,
      errorAfterField: true,
      validators: [validators.min(0), validators.integer()],
      cssClasses: {
        label: ["form__label"],
      },
      widget: forms.widgets.number({
        classes: ["form__input--textNum"],
      }),
    }),
    energy: fields.string({
      required: true,
      errorAfterField: true,
      validators: [validators.minlength(5), validators.maxlength(50)],
      cssClasses: {
        label: ["form__label"],
      },
      widget: forms.widgets.text({
        classes: ["form__input--textNum"],
      }),
    }),
    fat: fields.number({
      required: true,
      errorAfterField: true,
      validators: [validators.min(0), validators.integer()],
      cssClasses: {
        label: ["form__label"],
      },
      widget: forms.widgets.number({
        classes: ["form__input--textNum"],
      }),
    }),
    saturated_fat: fields.number({
      required: true,
      errorAfterField: true,
      validators: [validators.min(0), validators.integer()],
      cssClasses: {
        label: ["form__label"],
      },
      widget: forms.widgets.number({
        classes: ["form__input--textNum"],
      }),
    }),
    carbohydrates: fields.number({
      required: true,
      errorAfterField: true,
      validators: [validators.min(0), validators.integer()],
      cssClasses: {
        label: ["form__label"],
      },
      widget: forms.widgets.number({
        classes: ["form__input--textNum"],
      }),
    }),
    sugars: fields.number({
      required: true,
      errorAfterField: true,
      validators: [validators.min(0), validators.integer()],
      cssClasses: {
        label: ["form__label"],
      },
      widget: forms.widgets.number({
        classes: ["form__input--textNum"],
      }),
    }),
    fiber: fields.number({
      required: true,
      errorAfterField: true,
      validators: [validators.min(0), validators.integer()],
      cssClasses: {
        label: ["form__label"],
      },
      widget: forms.widgets.number({
        classes: ["form__input--textNum"],
      }),
    }),
    protein: fields.number({
      required: true,
      errorAfterField: true,
      validators: [validators.min(0), validators.integer()],
      cssClasses: {
        label: ["form__label"],
      },
      widget: forms.widgets.number({
        classes: ["form__input--textNum"],
      }),
    }),
    sodium: fields.number({
      required: true,
      errorAfterField: true,
      validators: [validators.min(0), validators.integer()],
      cssClasses: {
        label: ["form__label"],
      },
      widget: forms.widgets.number({
        classes: ["form__input--textNum"],
      }),
    }),
    warning: fields.string({
      required: true,
      errorAfterField: true,
      validators: [validators.minlength(1), validators.maxlength(300)],
      cssClasses: {
        label: ["form__label"],
      },
      widget: forms.widgets.textarea({
        classes: ["form__input--textNum"],
      }),
    }),
    color_theme: fields.string({
      required: true,
      errorAfterField: true,
      validators: [validators.regexp(/^#[0-9A-F]{6}$/i)],
      cssClasses: {
        label: ["form__label"],
      },
      widget: forms.widgets.text({
        classes: ["form__input--textNum"],
      }),
    }),
    img_url: fields.url({
      widget: forms.widgets.hidden({
        classes: ["form__input--textNum"],
      }),
    }),
    bg_url: fields.url({
      widget: forms.widgets.hidden({
        classes: ["form__input--textNum"],
      }),
    }),
  });
}


// router.get("/", checkIfAuthenticated, async (req, res) => {
//   const allCategory = await Category.fetchAll().map((category) => {
//     return [category.get("id"), category.get("title")];
//   });
//   allCategory.unshift([0, "-------------"]);
//   const allClassification = await Classification.fetchAll().map(
//     (classification) => {
//       return [classification.get("id"), classification.get("title")];
//     }
//   );
//   const allProductIngredient = await ProductIngredient.fetchAll().map(
//     (productIngredient) => {
//       return [productIngredient.get("id"), productIngredient.get("title")];
//     }
//   );

//   let searchForm = searchProductForm(
//     allCategory,
//     allClassification,
//     allProductIngredient
//   );
//   let product = await Product.collection();

//   searchForm.handle(req, {
//     success: async (form) => {
//       if (form.data.title) {
//         product = product.where("title", "like", "%" + req.query.title + "%") 
//       }

//       let searchResult = await product.fetch({
//         withRelated: ["category"],
//       });
//       res.render("product/index", {
//         product: searchResult.toJSON(),
//         form: form.toHTML(addScssValidationsSearch),
//       });
//     },

//     empty: async (form) => {
//       let searchResult = await product.fetch({
//         withRelated: ["category"],
//       });
//       res.render("product/index", {
//         product: searchResult.toJSON(),
//         form: form.toHTML(addScssValidationsSearch),
//       });
//     },
//     error: async (form) => {
//       let searchResult = await product.fetch({
//         withRelated: ["category"],
//       });
//       res.render("product/index", {
//         product: searchResult.toJSON(),
//         form: form.toHTML(addScssValidationsSearch),
//       });
//     },
//   });
// });


const searchProductForm = (category, classification, productIngredient) => {
  return forms.create({
    title: fields.string({
      required: false,
      errorAfterField: true,
      validators: [validators.maxlength(50)],
      cssClasses: {
        label: ["form__label"],
      },
      widget: forms.widgets.text({
        classes: ["form__input--search"],
      }),
    }),
    category_id: fields.string({
      required: false,
      errorAfterField: true,
      cssClasses: {
        label: ["form__label"],
      },
      widget: forms.widgets.select({
        classes: ["form__input--search"],
      }),
      choices: category
    }),
    classification: fields.string({
      required: false,
      errorAfterField: true,
      cssClasses: {
        label: ["form__label"],
      },
      widget: forms.widgets.multipleSelect({
        classes: ["form__input--search"],
      }),
      choices: classification
    }),
    productIngredient: fields.string({
      required: false,
      errorAfterField: true,
      cssClasses: {
        label: ["form__label"],
      },
      widget: forms.widgets.multipleSelect({
        classes: ["form__input--search"],
      }),
      choices: productIngredient
    }),
    price: fields.number({
      required: false,
      errorAfterField: true,
      validators: [validators.integer()],
      cssClasses: {
        label: ["form__label"],
      },
      widget: forms.widgets.number({
        classes: ["form__input--search"],
      }),
    }),
    fat: fields.number({
      required: false,
      errorAfterField: true,
      validators: [validators.integer()],
      cssClasses: {
        label: ["form__label"],
      },
      widget: forms.widgets.number({
        classes: ["form__input--search"],
      }),
    }),
    saturated_fat: fields.number({
      required: false,
      errorAfterField: true,
      validators: [validators.integer()],
      cssClasses: {
        label: ["form__label"],
      },
      widget: forms.widgets.number({
        classes: ["form__input--search"],
      }),
    }),
    carbohydrates: fields.number({
      required: false,
      errorAfterField: true,
      validators: [validators.integer()],
      cssClasses: {
        label: ["form__label"],
      },
      widget: forms.widgets.number({
        classes: ["form__input--search"],
      }),
    }),
    sugars: fields.number({
      required: false,
      errorAfterField: true,
      validators: [validators.integer()],
      cssClasses: {
        label: ["form__label"],
      },
      widget: forms.widgets.number({
        classes: ["form__input--search"],
      }),
    }),
    fiber: fields.number({
      required: false,
      errorAfterField: true,
      validators: [validators.integer()],
      cssClasses: {
        label: ["form__label"],
      },
      widget: forms.widgets.number({
        classes: ["form__input--search"],
      }),
    }),
    protein: fields.number({
      required: false,
      errorAfterField: true,
      validators: [validators.integer()],
      cssClasses: {
        label: ["form__label"],
      },
      widget: forms.widgets.number({
        classes: ["form__input--search"],
      }),
    }),
    sodium: fields.number({
      required: false,
      errorAfterField: true,
      validators: [validators.integer()],
      cssClasses: {
        label: ["form__label"],
      },
      widget: forms.widgets.number({
        classes: ["form__input--search"],
      }),
    }),
  });
}



const createRecipieForm = (product) => {
  return forms.create({
    title: fields.string({
      required: true,
      errorAfterField: true,
      validators: [validators.minlength(5), validators.maxlength(50)],
      cssClasses: {
        label: ["form__label"],
      },
      widget: forms.widgets.text({
        classes: ["form__input--textNum"],
      }),
    }),
    time_taken: fields.number({
      required: true,
      errorAfterField: true,
      validators: [validators.min(0), validators.integer()],
      cssClasses: {
        label: ["form__label"],
      },
      widget: forms.widgets.number({
        classes: ["form__input--textNum"],
      }),
    }),
    difficulty: fields.number({
      required: true,
      errorAfterField: true,
      validators: [validators.min(0), validators.integer()],
      cssClasses: {
        label: ["form__label"],
      },
      widget: forms.widgets.number({
        classes: ["form__input--textNum"],
      }),
    }),
    recipie_url: fields.url({
      required: true,
      errorAfterField: true,
      validators: [validators.url()],
      cssClasses: {
        label: ["form__label"],
      },
      widget: forms.widgets.text({
        classes: ["form__input--textNum"],
      }),
    }),
    product: fields.string({
      required: true,
      errorAfterField: true,
      validators: [validators.required()],
      cssClasses: {
        label: ["form__label"],
      },
      widget: forms.widgets.multipleSelect({
        classes: ["form__input--select"],
      }),
      choices: product
    }),
  });
}



const createCategoryForm = () => {
  return forms.create({
    title: fields.string({
      required: true,
      errorAfterField: true,
      validators: [validators.minlength(5), validators.maxlength(50)],
      cssClasses: {
        label: ["form__label"],
      },
      widget: forms.widgets.text({
        classes: ["form__input--textNum"],
      }),
    }),
  });
};



const createClassificationForm = () => {
  return forms.create({
    title: fields.string({
      required: true,
      errorAfterField: true,
      validators: [validators.minlength(5), validators.maxlength(50)],
      cssClasses: {
        label: ["form__label"],
      },
      widget: forms.widgets.text({
        classes: ["form__input--textNum"],
      }),
    }),
  });
};



const createProductIngredientForm = () => {
  return forms.create({
    title: fields.string({
      required: true,
      errorAfterField: true,
      validators: [validators.minlength(5), validators.maxlength(50)],
      cssClasses: {
        label: ["form__label"],
      },
      widget: forms.widgets.text({
        classes: ["form__input--textNum"],
      }),
    }),
  });
};



const createContentForm = (product) => {
  return forms.create({
    product_id: fields.number({
      required: true,
      errorAfterField: true,
      validators: [validators.integer()],
      cssClasses: {
        label: ["form__label"],
      },
      widget: forms.widgets.select({
        classes: ["form__input--select"],
      }),
      choices: product
    }),
    title: fields.string({
      required: true,
      errorAfterField: true,
      validators: [validators.minlength(5), validators.maxlength(50)],
      cssClasses: {
        label: ["form__label"],
      },
      widget: forms.widgets.text({
        classes: ["form__input--textNum"],
      }),
    }),
    description: fields.string({
      required: true,
      errorAfterField: true,
      validators: [validators.minlength(1), validators.maxlength(300)],
      cssClasses: {
        label: ["form__label"],
      },
      widget: forms.widgets.textarea({
        classes: ["form__input--textNum"],
      }),
    }),
  });
};



const createGiftForm = (product) => {
  return forms.create({
    title: fields.string({
      required: true,
      errorAfterField: true,
      validators: [validators.minlength(5), validators.maxlength(50)],
      cssClasses: {
        label: ["form__label"],
      },
      widget: forms.widgets.text({
        classes: ["form__input--textNum"],
      }),
    }),
    price: fields.number({
      required: true,
      errorAfterField: true,
      validators: [validators.min(0), validators.integer()],
      cssClasses: {
        label: ["form__label"],
      },
      widget: forms.widgets.number({
        classes: ["form__input--textNum"],
      }),
    }),
    product: fields.string({
      required: true,
      errorAfterField: true,
      validators: [validators.required()],
      cssClasses: {
        label: ["form__label"],
      },
      widget: forms.widgets.multipleSelect({
        classes: ["form__input--select"],
      }),
      choices: product
    }),
  });
};



const createInstructionForm = (recipie) => {
  return forms.create({
    index: fields.number({
      required: true,
      errorAfterField: true,
      validators: [validators.min(0), validators.integer()],
      cssClasses: {
        label: ["form__label"],
      },
      widget: forms.widgets.number({
        classes: ["form__input--textNum"],
      }),
    }),
    instruction: fields.string({
      required: true,
      errorAfterField: true,
      validators: [validators.minlength(1), validators.maxlength(300)],
      cssClasses: {
        label: ["form__label"],
      },
      widget: forms.widgets.textarea({
        classes: ["form__input--textNum"],
      }),
    }),
    recipie_id: fields.string({
      required: true,
      errorAfterField: true,
      validators: [validators.required()],
      cssClasses: {
        label: ["form__label"],
      },
      widget: forms.widgets.select({
        classes: ["form__input--select"],
      }),
      choices: recipie
    }),
  });
}


const createRecipieIngredientForm = (recipie) => {
  return forms.create({
    type: fields.string({
      required: true,
      errorAfterField: true,
      validators: [validators.minlength(5), validators.maxlength(50)],
      cssClasses: {
        label: ["form__label"],
      },
      widget: forms.widgets.text({
        classes: ["form__input--textNum"],
      }),
    }),
    description: fields.string({
      required: true,
      errorAfterField: true,
      validators: [validators.minlength(1), validators.maxlength(300)],
      cssClasses: {
        label: ["form__label"],
      },
      widget: forms.widgets.textarea({
        classes: ["form__input--textNum"],
      }),
    }),
    recipie_id: fields.string({
      required: true,
      errorAfterField: true,
      validators: [validators.required()],
      cssClasses: {
        label: ["form__label"],
      },
      widget: forms.widgets.select({
        classes: ["form__input--select"],
      }),
      choices: recipie
    }),
  });
}


const createLoginForm = () => {
  return forms.create({
    email: fields.email({
      required: true,
      errorAfterField: true,
      validators: [validators.email()],
      cssClasses: {
        label: ["form__label"],
      },
      widget: forms.widgets.text({
        classes: ["form__input--login"],
      }),
    }),
    password: fields.password({
      required: true,
      errorAfterField: true,
      validators: [validators.minlength(8), validators.maxlength(50)],
      cssClasses: {
        label: ["form__label"],
      },
      widget: forms.widgets.password({
        classes: ["form__input--login"],
      }),
    }),
  });
}


const createMediaForm = (product) => {
  return forms.create({
    product_id: fields.number({
      required: true,
      errorAfterField: true,
      validators: [validators.integer()],
      cssClasses: {
        label: ["form__label"],
      },
      widget: forms.widgets.select({
        classes: ["form__input--select"],
      }),
      choices: product
    }),

    media_url: fields.url({
      widget: forms.widgets.hidden({
        classes: ["form__input--textNum"],
      }),
    }),

  });
}

const createGetUserForm = (user) => {
  return forms.create({
    user_id: fields.string({
      required: true,
      errorAfterField: true,
      validators: [validators.required()],
      cssClasses: {
        label: ["form__label"],
      },
      widget: forms.widgets.select({
        classes: ["form__input--select"],
      }),
      choices: user
    }),
  })
}



module.exports = {
  addScssValidations,
  addScssValidationsSearch,

  createProductForm,
  searchProductForm,

  createCategoryForm,
  createClassificationForm,
  createProductIngredientForm,
  createContentForm,
  createGiftForm,
  createRecipieForm,
  createInstructionForm,
  createRecipieIngredientForm,
  createLoginForm,
  createMediaForm,
  
  createGetUserForm
};


// a478932a290d1ce72c64
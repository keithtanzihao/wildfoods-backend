const bookshelf = require("../bookshelf");

const Product = bookshelf.model("Product", {
  tableName: "product",
  category() {
    return this.belongsTo("Category");
  },
  classification() {
    return this.belongsToMany("Classification");
  },
  productIngredient() {
    return this.belongsToMany("ProductIngredient");
  },
  gift() {
    return this.belongsToMany("Gift");
  },
  recipie() {
    return this.belongsToMany("Recipie");
  }
});

const Category = bookshelf.model("Category", {
  tableName: "category",
  product() {
    return this.hasMany("Product");
  },
});

const Classification = bookshelf.model("Classification", {
  tableName: "classification",
  product() {
    return this.belongsToMany("Product");
  }
});

const ProductIngredient = bookshelf.model("ProductIngredient", {
  tableName: "productIngredient",
  product() {
    return this.belongsToMany("Product");
  },
});

const Content = bookshelf.model("Content", {
  tableName: "content",
  product() {
    return this.belongsTo("Product");
  }
})

const Gift = bookshelf.model("Gift", {
  tableName: "gift",
  product() {
    return this.belongsToMany("Product");
  }
})

const GiftProduct = bookshelf.model("GiftProduct", {
  tableName: "gift_product"
})

const Recipie = bookshelf.model("Recipie", {
  tableName: "recipie",
  product() {
    return this.belongsToMany("Product");
  }
})

const Instruction = bookshelf.model("Instruction", {
  tableName: "instruction",
  recipie() {
    return this.belongsTo("Recipie");
  }
})

const RecipieIngredient = bookshelf.model("RecipieIngredient", {
  tableName: "recipieIngredient",
  recipie() {
    return this.belongsTo("Recipie");
  }
})

const Media = bookshelf.model("Media", {
  tableName: "media",
  product() {
    return this.belongsTo("Product");
  }
})

const Staff = bookshelf.model("Staff", {
  tableName: "staff",
})

const User = bookshelf.model("User", {
  tableName: "user",
  cart() {
    return this.hasMany("Cart");
  }
})

const Cart = bookshelf.model("Cart", {
  tableName: "cart",
  product() {
    return this.belongsTo("Product");
  },
  user() {
    return this.belongsTo("User")
  }
})

const BlacklistedToken = bookshelf.model('BlacklistedToken',{
  tableName: 'blacklisted_tokens'
})

const Order = bookshelf.model("Order", {
  tableName: "order",
  product() {
    return this.belongsTo("Product");
  },
  user() {
    return this.belongsTo("User")
  },
  status() {
    return this.belongsTo("Status");
  }
 })

const Status = bookshelf.model("Status", {
  tableName: "status",
  order() {
    return this.hasMany("Order");
  }
})


module.exports = {
  Staff,
  Product,
  Category,
  Classification,
  // Classification_Product,
  ProductIngredient,
  Content,
  Gift,
  GiftProduct,
  Recipie,
  Instruction,
  RecipieIngredient,
  Media,
  User,
  Cart,
  BlacklistedToken,
  Order,
  Status
};

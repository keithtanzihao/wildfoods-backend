const express = require("express");
const hbs = require("hbs");
const wax = require("wax-on");
const cors = require("cors");
const session = require('express-session');
const flash = require('connect-flash'); 
const FileStore = require('session-file-store')(session);
const csurf = require("csurf");
require("dotenv").config();

let app = express();
app.use(cors());
app.use(session({
  store: new FileStore(),
  secret: 'wildfoods',
  resave: false,
  saveUninitialized: false,
}))

app.set("view engine", "hbs");

app.use(express.static('public'));

wax.on(hbs.handlebars);
wax.setLayoutPath("./views/layouts");
hbs.registerPartials(__dirname + '/views/partials', function (err) {});

app.use(express.urlencoded({ extended: false })); 

app.use(flash())
app.use(function (req, res, next) {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
}); 

const csurfInstance = csurf();
app.use(function(req, res, next) {
  console.log(req.url);
  console.log(req.url.slice(0,7));
  if (req.url.slice(0,7) !== "/admin/") {
    next();
  } else {
    csurfInstance(req, res, next);
  }
})


const staffRoutes = require("./routes/staff");
const cloudinaryRoutes = require('./routes/cloudinary.js')

const productRoutes = require("./routes/product");
const categoryRoutes = require("./routes/category");
const classificationRoutes = require("./routes/classification");
const productIngredientRoutes = require("./routes/productIngredient");
const mediaRoutes = require("./routes/media");
const contentRoutes = require("./routes/content");
const giftRoutes = require("./routes/gift");
const recipieRoutes = require("./routes/recipie");
const instructionRoutes = require("./routes/instruction");
const recipieIngredient = require("./routes/recipieIngredient");
const cartRoutes = require("./routes/cart");

const categoryAPI = require("./routes/api/category");
const classificationAPI = require("./routes/api/classification");
const productAPI = require("./routes/api/product");
const userAPI = require("./routes/api/user");
const cartAPI = require("./routes/api/cart");
const checkoutAPI = require("./routes/api/checkout");
const orderAPI = require("./routes/api/order");

app.use(function(req,res,next){
  res.locals.csrfToken = req.csrfToken();
  res.locals.staff = req.session.staff;
  next();
})

app.use(function (err, req, res, next) {
  if (err && err.code == "EBADCSRFTOKEN") {
      console.log("The form has expired / CSRF problem. Please try again");
      req.flash('error', 'The form has expired. Please try again');
      res.redirect('/admin/login');
  } else {
      next()
  }
});

async function main() {
  app.use("/admin", express.json(), staffRoutes);
  app.use('/cloudinary', express.json(), cloudinaryRoutes);

  app.use("/admin/product", express.json(), productRoutes);
  app.use("/admin/category", express.json(), categoryRoutes);
  app.use("/admin/classification", express.json(), classificationRoutes);
  app.use("/admin/productIngredient", express.json(), productIngredientRoutes);
  app.use("/admin/media", express.json(), mediaRoutes);
  app.use("/admin/content", express.json(), contentRoutes);
  app.use("/admin/gift", express.json(), giftRoutes);
  app.use("/admin/recipie", express.json(), recipieRoutes);
  app.use("/admin/instruction", express.json(), instructionRoutes);
  app.use("/admin/recipieIngredient", express.json(), recipieIngredient);
  app.use("/admin/cart", express.json(), cartRoutes);

  app.use("/category", express.json(), categoryAPI);
  app.use("/classification", express.json(), classificationAPI);
  app.use("/product", express.json(), productAPI);
  app.use("/user", express.json(), userAPI);
  app.use("/cart/", express.json(), cartAPI);
  app.use("/checkout/", checkoutAPI);
  app.use("/order/", express.json(), orderAPI);
}

main();

app.listen(process.env.PORT, () => {
  console.log("Server has started " + process.env.PORT);
});




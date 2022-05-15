const express = require("express");
const hbs = require("hbs");
const wax = require("wax-on");
const cors = require("cors");
const session = require('express-session');
const flash = require('connect-flash'); 
const FileStore = require('session-file-store')(session);
const csurf = require("csurf");

require("dotenv").config();

// create an instance of express app
let app = express();

// Allow cors
app.use(cors());

app.use(session({
  // store: new FileStore(fileStoreConfig),
  
  // Uncomment if we want ot use session-file-store
  store: new FileStore(),
  secret: 'wildfoods',
  resave: false,
  saveUninitialized: true,
}))

// set the view engine
app.set("view engine", "hbs");

// static folder
app.use(express.static('public'));

// setup wax-on
wax.on(hbs.handlebars);
wax.setLayoutPath("./views/layouts");
hbs.registerPartials(__dirname + '/views/partials', function (err) {});

// enable forms
app.use(express.json());

// Might be a problem not sure
app.use(express.urlencoded({ extended: false })); 

// Flash
app.use(flash())
app.use(function (req, res, next) {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
}); 

// Cross site request forgery
const csurfInstance = csurf();
app.use(function(req, res, next) {
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

// Placed csrfToken and session stuff here.
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
  app.use("/admin", staffRoutes);
  app.use('/cloudinary', cloudinaryRoutes);

  app.use("/admin/product", productRoutes);
  app.use("/admin/category", categoryRoutes);
  app.use("/admin/classification", classificationRoutes);
  app.use("/admin/productIngredient", productIngredientRoutes);
  app.use("/admin/media", mediaRoutes);
  app.use("/admin/content", contentRoutes);
  app.use("/admin/gift", giftRoutes);
  app.use("/admin/recipie", recipieRoutes);
  app.use("/admin/instruction", instructionRoutes);
  app.use("/admin/recipieIngredient", recipieIngredient);
  app.use("/admin/cart", cartRoutes);


  app.use("/category", categoryAPI);
  app.use("/classification", classificationAPI);
  app.use("/product", productAPI);
  app.use("/user", userAPI);
  app.use("/cart/", cartAPI);
  app.use("/checkout/", checkoutAPI);
}

main();

app.listen(process.env.PORT, () => {
  console.log("Server has started");
});




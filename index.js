const express = require("express");
const hbs = require("hbs");
const wax = require("wax-on");
const cors = require("cors");
const flash = require("connect-flash");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const csurf = require("csurf");
require("dotenv").config();

const {
  setSessionOptions,
  flashMsgMiddleware,
  csurfMiddleware,
  csurfTokenMiddleware,
  csurfErrorMiddleware,
  errorRedirectMiddleware,
} = require("./utility/configuration");

const adminRoutes = require("./routes/admin");
const apiRoutes = require("./routes/api");
const errorRoutes = require("./routes/error");

let app = express();
// const csurfInstance = csurf();

app.set("view engine", "hbs");
app.use(express.static("public"));
wax.on(hbs.handlebars);
wax.setLayoutPath("./views/layouts");
hbs.registerPartials(__dirname + "/views/partials");

// app.use(cors());
// app.use(session({
//   store: new FileStore(),
//   secret: 'wildfoods',
//   resave: false,
//   saveUninitialized: false,
// }))
// app.use(express.urlencoded({ extended: false }));
// app.use(flash())
// app.use(function (req, res, next) {
//   res.locals.success = req.flash("success");
//   res.locals.error = req.flash("error");
//   next();
// });
// app.use(function (req, res, next) {
//   if (req.url.slice(0, 7) !== "/admin/") {
//     next();
//   } else {
//     csurfInstance(req, res, next);
//   }
// })
// app.use(function (req, res, next) {
//   res.locals.csrfToken = req.csrfToken();
//   res.locals.staff = req.session.staff;
//   next();
// })
// app.use(function (err, req, res, next) {
//   if (err && err.code == "EBADCSRFTOKEN") {
//     console.log("The form has expired / CSRF problem. Please try again");
//     req.flash('error', 'The form has expired. Please try again');
//     res.redirect('/admin/login');
//   } else {
//     next()
//   }
// });

app.use(cors());
app.use(session(setSessionOptions()));
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(flashMsgMiddleware);
app.use(csurfMiddleware);
app.use(csurfTokenMiddleware);
app.use(csurfErrorMiddleware);

// const staffRoutes = require("./routes/admin/staff");
// const cloudinaryRoutes = require('./routes/admin/cloudinary.js')

// const productRoutes = require("./routes/admin/product");
// const categoryRoutes = require("./routes/admin/category");
// const classificationRoutes = require("./routes/admin/classification");
// const productIngredientRoutes = require("./routes/admin/productIngredient");
// const mediaRoutes = require("./routes/admin/media");

// const contentRoutes = require("./routes/admin/content");
// const giftRoutes = require("./routes/admin/gift");
// const recipieRoutes = require("./routes/admin/recipie");
// const instructionRoutes = require("./routes/admin/instruction");
// const recipieIngredient = require("./routes/admin/recipieIngredient");
// const cartRoutes = require("./routes/admin/cart");
// const orderRoutes = require("./routes/admin/orders");

const categoryAPI = require("./routes/api/category");
const classificationAPI = require("./routes/api/classification");
const productAPI = require("./routes/api/product");
const userAPI = require("./routes/api/user");
const cartAPI = require("./routes/api/cart");
const checkoutAPI = require("./routes/api/checkout");
const orderAPI = require("./routes/api/order");

async function main() {
  // app.get("/", function (req, res) {
  //   if (req.session.staff) {
  //     res.redirect("/admin/product");
  //   } else {
  //     res.redirect("/admin/login");
  //   }
  // });
  app.use(express.json(), adminRoutes);
  // app.use(apiRoutes);
  // app.use(errorRoutes);
  // app.use(errorRedirectMiddleware);

  // app.use("/admin", express.json(), staffRoutes);
  // app.use('/cloudinary', express.json(), cloudinaryRoutes);

  // app.use("/admin/product", express.json(), productRoutes);
  // app.use("/admin/category", express.json(), categoryRoutes);
  // app.use("/admin/classification", express.json(), classificationRoutes);
  // app.use("/admin/productIngredient", express.json(), productIngredientRoutes);
  // app.use("/admin/media", express.json(), mediaRoutes);
  // app.use("/admin/content", express.json(), contentRoutes);
  // app.use("/admin/gift", express.json(), giftRoutes);
  // app.use("/admin/recipie", express.json(), recipieRoutes);
  // app.use("/admin/instruction", express.json(), instructionRoutes);
  // app.use("/admin/recipieIngredient", express.json(), recipieIngredient);
  // app.use("/admin/cart", express.json(), cartRoutes);
  // app.use("/admin/order", express.json(), orderRoutes);

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

const session = require("express-session");
const FileStore = require("session-file-store")(session);
const csurf = require("csurf");
const csurfInstance = csurf();

const setSessionOptions = () => {
  return {
    store: new FileStore(),
    secret: process.env.SESSION_SECRET || "wildfoods",
    resave: false,
    saveUninitialized: false,
  };
};

const flashMsgMiddleware = (req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
};

const csurfMiddleware = (req, res, next) => {
  (req.url.slice(0, 7) !== "/admin/") ? next() : csurfInstance(req, res, next);
};

const csurfTokenMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  res.locals.staff = req.session.staff;
  next();
}

const csurfErrorMiddleware = (err, req, res, next) => {
  if (err && err.code == "EBADCSRFTOKEN") {
    console.log("The form has expired / CSRF problem. Please try again");
    req.flash('error', 'The form has expired. Please try again');
    res.redirect('/admin/login');
  } else {
    next()
  }
}

module.exports = {
  setSessionOptions,
  flashMsgMiddleware,
  csurfMiddleware,
  csurfTokenMiddleware,
  csurfErrorMiddleware
};

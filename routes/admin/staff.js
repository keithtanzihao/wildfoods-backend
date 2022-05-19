const express = require("express");
const crypto = require("crypto");
const router = express.Router();
const { Staff } = require("../../models");
const { createLoginForm, addScssValidations } = require("../../utility/forms");
const { getHashedPassword, checkIfLogin } = require("../../utility");
const { catchAsync } = require("../../utility/expressError");


router.get("/register", checkIfLogin, catchAsync(async (req, res) => {
  const staffForm = createLoginForm();
  res.render("staff/register", {
    form: staffForm.toHTML(addScssValidations),
  });
}));


router.post("/register", checkIfLogin, catchAsync(async (req, res) => {
  const category = await Staff.query({
    where: {
      email: req.body.email,
    },
  }).fetch({
    require: false,
  });
  const staffForm = createLoginForm();
  if (category) {
    req.flash("error", [
      {
        message: `Error: Account with email already exist`,
      },
    ]);
    res.redirect("/admin/register");
  } else {
    staffForm.handle(req, {
      success: async (form) => {
        const staff = new Staff({
          email: form.data.email,
          password: getHashedPassword(form.data.password),
        });
        await staff.save();
        req.flash("success", [
          {
            message: `Successfullly create a new staff`,
          },
        ]);
        res.redirect("/admin/login");
      },
      error: async (form) => {
        res.render("staff/register", {
          form: form.toHTML(addScssValidations),
        });
      },
    });
  }
}));


// Login routes
router.get("/login", checkIfLogin, catchAsync(async (req, res) => {
  const staffForm = createLoginForm();
  res.render("staff/login", {
    form: staffForm.toHTML(addScssValidations),
  });
}));


router.post("/login", catchAsync(async (req, res) => {
  const staffForm = createLoginForm();
  staffForm.handle(req, {
    success: async (form) => {
      let staff = await Staff.where({
        email: form.data.email,
      }).fetch({
        require: false,
      });

      if (!staff || !staff.get("password")) {
        req.flash("error", [
          {
            message: `Error: Wrong email/password`,
          },
        ]);
        res.redirect("/admin/login");
      } else {
        if (staff.get("password").trim() === getHashedPassword(form.data.password)) {
          req.session.staff = {
            id: staff.get("id"),
            email: staff.get("email"),
          };
          req.flash("success", [
            {
              message: `Welome back ${staff.get("email")}`,
            },
          ]);
          // Seems req.session.save is required to save the data into sesion-file-store
          req.session.save(function (err) {
            res.redirect("/admin/product");
          });
        } else {
          req.flash("error", [
            {
              message: `Error: bruh`,
            },
          ]);
          res.redirect("/admin/login");
        }
      }
    },
    error: async (form) => {
      res.render("staff/login", {
        form: form.toHTML(addScssValidations),
      });
    },
  });
}));


router.get('/logout', (req, res) => {
  req.session.staff = null;
  req.flash('success_messages', "Goodbye");
  res.redirect('/admin/login');
})


module.exports = router;

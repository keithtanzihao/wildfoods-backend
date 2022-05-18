const session = require('express-session');
const FileStore = require('session-file-store')(session);

const crypto = require('crypto');
const jwt = require('jsonwebtoken');


// Api user login
const getHashedPassword = (password) => {
  return crypto.createHash("sha256").update(password).digest("base64"); 
}

// json web token for api user login 
const generateAccessToken = (user, secret, expiresIn) => {
  return jwt.sign({
      'id': user.id,
      'email': user.email
  }, secret, {
      expiresIn: expiresIn
  });
}

const checkIfLogin = (req, res, next) => {
  if (req.session.staff) {
    req.flash("error", [{
      message: `Error: Already logged in. Please logout first`
    }]);
    res.redirect("/admin/product");
  } else {
    next();
  }
}

const checkIfAuthenticated = (req, res, next) => {
  if (req.session.staff) {
    next();
  } else {
    req.flash("error", [{
      message: `Error: Access Denied. Please Login`
    }]);
    res.redirect("/admin/login");
  }
}

// Authentication middleware for API
const checkIfAuthenticatedJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  console.log("=============================");
  console.log(authHeader)

  if (authHeader) {
      const token = authHeader.split(' ')[1];

      jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
          if (err) {
              return res.sendStatus(403);
          }
          req.user = user;
          next();
      });
  } else {
      res.sendStatus(401);
  }
};

module.exports = {
  getHashedPassword,
  generateAccessToken,

  checkIfAuthenticatedJWT,

  checkIfAuthenticated,
  checkIfLogin
}

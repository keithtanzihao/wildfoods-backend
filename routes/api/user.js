const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const { User, BlacklistedToken } = require("../../models");
const { getHashedPassword, generateAccessToken, checkIfAuthenticatedJWT } = require("../../utility");

/**
 * ROUTES ALREADY WORK BUT ILL NEED TO APPLY THEM TO FRONTEND
 */


router.post("/register", async (req, res) => {
  const existingUser = await User.query(function (qb) {
    qb.where("email", "=", req.body.email)
  }).fetch({
    require: false
  })

  if (existingUser) {
    // Automatically throws an error in frontend, 
    // but backend doesnt terminate
    res.status(409).send({
      error: "Email already exist"
    })
  } else {
    const { password, ...userData } = req.body;
    const user = new User({
      ...userData,
      password: getHashedPassword(password)
    });
    await user.save();
    res.status(200).send({
      user: user.toJSON()
    })
  }
})

router.post("/login", async (req, res) => {
  let user = await User.where({
    email: req.body.email,
  }).fetch({
    require: false,
  });

  if (user && user.get("password").trim() === getHashedPassword(req.body.password)) {

    let accessToken = generateAccessToken(user.toJSON(), process.env.TOKEN_SECRET, "15m");
    let refreshToken = generateAccessToken(user.toJSON(), process.env.REFRESH_TOKEN_SECRET, "1d");

    res.status(200).send({
      email: req.body.email,
      accessToken: accessToken,
      refreshToken: refreshToken
    })
  } else {
    console.log("error");
    // res.status(404).send({
    //   error: "Wrong email/password"
    // })
  }
});

// To get new TOKEN_SECRET using REFRESH_TOKEN_SECRET
router.post('/refresh', async (req, res) => {
  console.log(" backend ----------------- testing 1")
  let refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    res.sendStatus(401);
  }


  // check if the refresh token has been black listed
  let blacklistedToken = await BlacklistedToken.where({
    'token': refreshToken
  }).fetch({
    require: false
  })

  // if the refresh token has already been blacklisted
  if (blacklistedToken) {
    res.status(401);
    return res.send('The refresh token has already expired')
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    let accessToken = generateAccessToken(user, process.env.TOKEN_SECRET, '15m');
    res.send({
      accessToken: accessToken,
    });
  })
})

router.post('/logout', async (req, res) => {
  let refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    res.sendStatus(401);
  } else {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      const token = new BlacklistedToken();
      token.set('token', refreshToken);
      token.set('date_created', new Date()); // use current date
      await token.save();
      res.send({
        'message': 'logged out'
      })
    })

  }

})



// Testing using ARC
router.get("/test/profile", checkIfAuthenticatedJWT, async (req, res) => {
  const user = req.user;
  res.send(user);
})

module.exports = router;

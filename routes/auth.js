'use strict';
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');


//Define your routes that need authentication check
router.get("/profile", auth, function(req, res, next) {
  res.send(`Hi ${res.locals.user.username}, your API call is authenticated!`);
  console.log(res.locals.user.username);
});


module.exports = router
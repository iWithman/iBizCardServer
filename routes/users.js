const auth = require('../middleware/auth');
const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();



router.get('/me', auth, async(req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});



router.post('/', async(req, res) => {
  // get the email
  let user = await User.findOne({ email: req.body.email });
  // check if user existed to reject or not
  if(user) {
    return res.status(400).send('User already registered.')
  } else {
    // create a new user to return these attributes
    user = new User({
      email: req.body.email,
      password: req.body.password,
      companyName: req.body.companyName
    });
    // generate a salt
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt)
    
    await user.save()

  }

  const token = user.generateToken();
  res.header('x-auth-token', token).send({
    _id: user._id,
    email: user.email,
    companyName: user.companyName
  })
})



module.exports = router;
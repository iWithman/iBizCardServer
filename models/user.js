const config = require('config');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  company: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 30
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  isAdmin: Boolean,
  // card: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User'
  // }
});

const userValidation = (user) => {
  const schema = {
    company: Joi.string().min(6).max(15).required(),
    email: Joi.string().min(6).max(15).required(),
    password: Joi.string().min(6).max(15).required(),
    isAdmin: Joi.boolean().required()
  }
  return Joi.validate(user, schema)
}

userSchema.methods.generateToken = function() {
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('myPrivateKey'));
  return token
}

const User = mongoose.model('User', userSchema);





exports.User = User;
exports.userValidation = userValidation;
exports.userSchema = userSchema;
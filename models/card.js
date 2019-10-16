const mongoose = require('mongoose');
const { userSchema } = require('../models/user');
const Joi = require('joi');

const cardSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  slogan: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  profession: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  phone: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  address: {
    type: String,
    minlength: 5,
    maxlength: 255
  },
  website: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  }
});

const cardValidation = (card) => {
  const schema = {
    company: Joi.string().min(6).max(15).required(),
    slogan: Joi.string().min(6).max(30).required(),
    name: Joi.string().min(6).max(30).required(),
    profession: Joi.string().min(6).max(30).required(),
    phone: Joi.string().min(6).max(30).required(),
    email: Joi.string().min(6).max(30).required().email(),
    address: Joi.string().min(6).max(25),
    website: Joi.string().min(6).max(30).required(),
  }
  return Joi.validate(card, schema)
}


const Card = mongoose.model('Card', cardSchema);

exports.Card = Card;
exports.cardValidation = cardValidation;
exports.cardSchema = cardSchema;

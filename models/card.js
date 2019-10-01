const mongoose = require('mongoose');
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
    type: Number,
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
    slogan: Joi.string().min(6).max(15).required(),
    name: Joi.string().min(6).max(15).required(),
    profession: Joi.string().min(6).max(15).required(),
    phone: Joi.number().min(6).max(15).required(),
    email: Joi.string().min(6).max(15).required(),
    address: Joi.string().min(6).max(25),
    website: Joi.string().min(6).max(15).required(),
  }
  return Joi.validate(card, schema)
}


const Card = mongoose.model('Card', cardSchema);

exports.Card = Card;
exports.cardValidation = cardValidation;
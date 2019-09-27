const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  company: String,
  slogan: String,
  name: String,
  profession: String,
  phone: Number,
  email: String,
  address: String,
  website: String,
  image: { data: Buffer, contentType: String }
})

const Card = mongoose.model('Card', cardSchema);

exports.Card = Card;
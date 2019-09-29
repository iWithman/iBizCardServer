const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

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

// Create card
router.post('/', async (req, res) => {
  let card = await Card({
    company: req.body.company,
    slogan: req.body.slogan,
    name: req.body.name,
    profession: req.body.profession,
    phone: req.body.phone,
    email: req.body.email,
    address: req.body.address,
    website: req.body.website,
    // image: req.body.image
  });

  
  // result to save the card
  const result = await card.save();
  res.send(result);
})


// Get all cards
router.get('/', async (req, res) => {
  const cards = await Card.find()
  res.send(cards)
})


// Get one card
router.get('/:id', async(req, res) => {
  const card = await Card.findById(req.params.id);
  res.send(card)
})


// Update card
router.put('/:id', async (req, res) => {
  const card = await Card.findByIdAndUpdate(req.params.id, {
    company: req.body.company,
    slogan: req.body.slogan,
    name: req.body.name,
    profession: req.body.profession,
    phone: req.body.phone,
    email: req.body.email,
    address: req.body.address,
    website: req.body.website,
    image: req.body.image
  })

  res.send(card)
})


// Detele a card
router.delete('/:id', async (req, res) => {
  const card = await Card.findByIdAndRemove(req.params.id, {
    company: req.body.company,
    slogan: req.body.slogan,
    name: req.body.name,
    profession: req.body.profession,
    phone: req.body.phone,
    email: req.body.email,
    address: req.body.address,
    website: req.body.website,
    image: req.body.image
  })
  
  res.send(card)
})


module.exports = router;
const { Card } = require('../models/card');
const { User } = require('../models/user');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const { cardValidation } = require('../models/card');



// Create card
router.post('/', async (req, res) => {
  
  const { error } = cardValidation(req.body)
  if(error) {
    return res.status(400).send(error.details[0].message);
  }

  let card = await Card.findOne({ email: req.body.email });
  // check if user existed to reject or not
  if(card) {
    return res.status(400).send('Card company already created.')
  } else {
    // if(cardId.user.length > 0) return res.send('You can not have more than one card.')
    try {
      card = new Card({
        company: req.body.company,
        slogan: req.body.slogan,
        name: req.body.name,
        profession: req.body.profession,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        website: req.body.website,
      });
      // result to save the card
      const result = await card.save();
      res.send(result);
    } catch(ex) {
      console.log(ex.error.details[0].message);
    }
  }

  
  // console.log(result);
})


// Get all cards
router.get('/', async (req, res) => {
  const cards = await Card.find()
  res.send(cards)
  // console.log(cards);
})


// Get one card
router.get('/:id', async (req, res) => {
  const card = await Card.findById(req.params.id)
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
const config = require('config');
const mongoose = require('mongoose');
const express =require('express');
const cors = require('cors');
const app = express();
const cards = require('./routes/cards');
const users = require('./routes/users');

if(!config.get('myPrivateKey')) {
  console.error('FATAL ERROR: myPrivateKey is not defined.');
  process(1);
}

mongoose.connect('mongodb://localhost/iBusiness-Card', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Cannot connect to MongoDB...', err));

app.use(express.json());
app.use(cors())

app.use('/api/cards', cards);







const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server started on port ${port}`))
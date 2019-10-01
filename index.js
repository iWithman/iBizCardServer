const config = require('config');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const express =require('express');
const cors = require('cors');
const app = express();
const cards = require('./routes/cards');
<<<<<<< HEAD

mongoose.connect('mongodb://localhost/iBusiness-Card', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Cannot connect to MongoDB...', err));

app.use(express.json());
app.use(cors())

app.use('/api/cards', cards);



=======
const users = require('./routes/users');

if(!config.get('myPrivateKey')) {
  console.error('FATAL ERROR: myPrivateKey is not defined.');
  process(1);
}

const db = process.env.DB_CONNECT;

mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Cannot connect to MongoDB...', err));

app.use(express.json());
app.use(cors())

app.use('/api/cards', cards);
app.use('/api/users', users);



>>>>>>> 28f32ffddb6a9773e2705110ad4179b852d2c627




const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}...`))
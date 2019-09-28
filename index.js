const config = require('config');
const mongoose = require('mongoose');
const express =require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const cards = require('./routes/cards');
const users = require('./routes/users');
const db = require('./config/keys').mongoURI;

if(!config.get('myPrivateKey')) {
  console.error('FATAL ERROR: myPrivateKey is not defined.');
  process(1);
}

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors())

app.use('/api/cards', cards);
app.use('/api/users', users);




mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Cannot connect to MongoDB...', err));








const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}...`))
const config = require('config');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const express =require('express');
const { handler:cards } = require('./routes/cards');
const auth = require('./routes/auth');
const cors = require('cors');
const app = express();
const serverless = require('serverless-http');

if(!config.get('myPrivateKey')) {
  console.error('FATAL ERROR: myPrivateKey is not defined.');
  process.exit(1);
}

const db = process.env.DB_CONNECT;

mongoose.connect(db, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Cannot connect to MongoDB...', err));

app.use(express.json());
app.use(cors())

app.use('/api/cards', cards);
app.use('/api/auth', auth);

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Listening on port ${port}...`));

// module.exports.handler = serverless(app);
module.exports = app
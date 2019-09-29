const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  try {
    const decoded = jwt.verify(token, config.get('myPrivateKey'))
    req.user = decoded;
    next();
  } catch(ex) {
    console.log(ex);
  }
}

module.exports = auth;
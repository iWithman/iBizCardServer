
function admin(req, res, next) {
  // 401 Unauthorized
  // 403 Forbidden
  if(!req.user.isAmin) {
    return res.status(403).send('Access denied.');
  }
  next();
}

module.exports = admin;
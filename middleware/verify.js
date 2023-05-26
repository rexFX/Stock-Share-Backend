const User = require('../models/User');

module.exports = async (req, res, next) => {
  const user = await User.findOne({ accessToken: req.headers.authorization.split(" ")[1] });
  if (user) next();
  else return res.status(404).send({ message: 'User not found' });
}
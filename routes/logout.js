const express = require('express');
const router = express.Router();
const User = require('../models/User');
const verify = require('../middleware/verify.js');

router.post('/logout', verify, async (req, res) => {
  await User.deleteOne({ "accessToken": req.headers.authorization.split(" ")[1] });
  res.status(200).send("Logged out");
});

module.exports = router;
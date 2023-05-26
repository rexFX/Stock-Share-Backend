const express = require('express');
const router = express.Router();
const verify = require('../middleware/verify.js');


router.get('/loggedIn', verify, (req, res) => {
  res.status(200).send('User logged in');
});

module.exports = router;
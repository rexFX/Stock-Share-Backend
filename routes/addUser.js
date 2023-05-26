const express = require('express');
const router = express.Router();
const fetch = require('node-fetch')
const User = require('../models/User');

router.post('/addUser', async (req, res) => {
  const authorization = req.headers.authorization.split(" ")[1];
  await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${authorization}`)
    .then(res => res.json())
    .then(async ({ name, email }) => {
      const user = await User.findOne({ "name": name, "email": email });

      if (!user) {
        await User.create({ "accessToken": authorization, "name": name, "email": email });
      }
      else {
        user.accessToken = authorization;
        await user.save();
      }

      res.status(200).json({ name, email });
    })
    .catch((err) => console.log("error in /api/adduser", err));
});

module.exports = router;
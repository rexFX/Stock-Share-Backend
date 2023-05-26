const express = require('express');
const router = express.Router();
const fetch = require('node-fetch')
const verify = require('../middleware/verify.js');


router.post('/findCompany', verify, async (req, res) => {
  const { company, exchange } = req.body;
  await fetch(
    `https://fmpcloud.io/api/v3/search?query=${company}&limit=30&exchange=${exchange.toUpperCase()}&apikey=${process.env.FMPCLOUD_API_KEY}`
  )
    .then((resp) => resp.json())
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => console.log("error in findCompany endpoint", err));
});

module.exports = router;
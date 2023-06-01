const express = require('express');
const fetch = require('node-fetch')
const router = express.Router();
const verify = require('../middleware/verify.js');


router.post('/getStocks', verify, async (req, res) => {
  const { symbol } = req.body;
  await fetch(
    `https://mboum-finance.p.rapidapi.com/hi/history?symbol=${symbol}&interval=1d&diffandsplits=false`,
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
        "X-RapidAPI-Host": "mboum-finance.p.rapidapi.com",
      },
    }
  )
    .then((res) => res.json())
    .then((stockData) => {
      let label = [];
      let data = [];
      let filteredData = [];

      const today = new Date();
      const yyyy = today.getFullYear();
      let mm = today.getMonth() + 1;

      for (let key in stockData.items) {
        let date = stockData.items[key].date.split("-");

        // || parseInt(date[0]) === mm ||
        // parseInt(date[0]) === mm - 2)
        if (
          parseInt(date[0]) === mm - 1
          &&
          parseInt(date[2]) === yyyy) {
          date = `${date[1]}-${date[0]}-${date[2]}`;
          label.push(date);
          data.push(stockData.items[key].close);
        }
      }
      filteredData = [
        {
          labels: label,
          datasets: [
            {
              label: stockData.meta.symbol,
              data: data,
              backgroundColor: "rgba(255, 181, 167, 0.4)",
              fill: true,
              borderColor: "rgba(75,192,192,1)",
              borderWidth: 2,
            },
          ],
        },
        {
          currency: stockData.meta.currency,
        }
      ]
      return res.status(200).send(filteredData);
    })
    .catch((err) => console.log(err));
});


module.exports = router;
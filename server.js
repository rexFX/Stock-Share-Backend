require("dotenv").config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('hey!');
});

const addUser = require('./routes/addUser');
const findCompany = require('./routes/findCompany');
const getStocks = require('./routes/getStocks');
const loginStatus = require('./routes/loginStatus');
const logout = require('./routes/logout');

app.use('/api/', addUser);
app.use('/api/', findCompany);
app.use('/api/', getStocks);
app.use('/api/', loginStatus);
app.use('/api/', logout);

const connect = async () => {
  await mongoose.connect(process.env.MONGO_DB_URL)
    .then(() => {
      console.log("Database Connected");
    })
    .catch((err) => {
      process.exit(1);
      console.log(err);
    });
}

connect().then(() => {
  app.listen(process.env.PORT || 4000, () => {
    console.log('Server listening on port 4000');
  });
});
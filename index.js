// index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const web = express();
const env=require('dotenv');
const path=require('path');
const vendorroutes = require('./Routes/Venderrouter');
const Firmroute=require('./Routes/Firmroute');
const Productroutes=require('./Routes/Productrouter');

const port = process.env.PORT|| 5000;
env.config();
web.listen(port, () => {
  console.log(`Server running successfully at ${port}`);
});

web.use(express.json());
web.use('/vendor', vendorroutes);
web.use('/firm', Firmroute);
web.use('/product',Productroutes);
web.use('/uploads',express.static('uploads'));

web.get('/', (req, res) => {
  res.send("MongoDB connected successfully");
});

mongoose.connect("mongodb+srv://adepusanjay444:abc1234@cluster0.vrw0p.mongodb.net/fsqure")
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.log(error);
  }); 

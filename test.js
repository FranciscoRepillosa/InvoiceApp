const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000
const path = require('path')
const cookieParser = require("cookie-parser");


const conectionString = "mongodb://127.0.0.1:27017/invoice"

mongoose.connect(conectionString, {useNewUrlParser: true, useUnifiedTopology: true})

app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'pug')
app.use(express.json({limit: '10kb'}));
app.use(cookieParser());



// require the routes file of the invoice folder
const invoiceRoutes = require('./invoice/routes.config.js');
const userRoutes = require('./user/routes.config.js');

const authController = require('./user/controllers/auth.controller.js');

app.use('/invoice', authController.protect, invoiceRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

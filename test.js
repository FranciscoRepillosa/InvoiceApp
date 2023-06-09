const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000
const path = require('path')
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const globalErrorHandler = require('./utils/errorHandlers.js');
const cors = require('cors');


//const conectionString = "mongodb://24.199.88.210:27017/invoice"
const conectionString = "mongodb://127.0.0.1:27017/invoice"

mongoose.connect(conectionString, {useNewUrlParser: true, useUnifiedTopology: true})

app.set(cors())
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'pug')
app.use(express.json({limit: '10kb'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));




// require the routes file of the invoice folder
const invoiceRoutes = require('./invoice/routes.config.js');
const userRoutes = require('./user/routes.config.js');
const checkoutRoutes = require('./checkout/routes.config.js');

const authController = require('./user/controllers/auth.controller.js');

app.use('/invoice', authController.protect, invoiceRoutes);
app.use('/user', userRoutes);
app.use('/checkout', checkoutRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

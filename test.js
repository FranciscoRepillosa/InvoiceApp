const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 6666

const conectionString = "mongodb+srv://frenchi:O197YM4p8Q3d0HS2@db-mongodb-nyc1-42599-07ea1556.mongo.ondigitalocean.com/invoice?tls=true&authSource=admin&replicaSet=db-mongodb-nyc1-42599"

mongoose.connect(conectionString, {
  serverSelectionTimeoutMS: 5000  
}
);



// require the routes file of the invoice folder
const invoiceRoutes = require('./invoice/routes.config.js');

app.use('/invoice', invoiceRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

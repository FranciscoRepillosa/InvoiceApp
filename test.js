// This is a simple Node.js server that listens on port 3000 and responds with a message when a GET request is made to the root path.
// Express is a Node.js web application framework that provides a set of features for web and mobile applications.
// The app.listen() method instructs the server to begin listening for client requests on the specified port and host.
// The app.get() method specifies a callback function to be executed when a client requests a particular route (in this case, the root path).
// The callback function takes two arguments: the request and response objects.
// The response object contains a send() method that can be used to send a response to the client.

const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000

mongoose.connect("mongodb+srv://frenchi:O197YM4p8Q3d0HS2@db-mongodb-nyc1-42599-07ea1556.mongo.ondigitalocean.com/admin?tls=true&authSource=admin&replicaSet=db-mongodb-nyc1-42599", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
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

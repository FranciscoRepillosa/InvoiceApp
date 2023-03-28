// require mongoose
const mongoose = require('mongoose');
// create a schema for the products collection, with the following fields: name, description, price, and category (which is a reference to the categories collection)

const productsSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'categories' }
});

// create a model for the products collection

const productsModel = mongoose.model('products', productsSchema);

// export the model

module.exports = productsModel;

// write in a comment a list of 50 methods that you can use on a mongoose model to interact with the database
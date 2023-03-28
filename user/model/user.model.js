// require mongoose
const mongoose = require('mongoose');

// create a schema for the user collection, with the following fields: username, password, products (which is an array of references to the products collection) and email

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'products' }],
    email: String
});

// create a model for the schema above  
const userModel = mongoose.model('user', userSchema);

// export the model
module.exports = userModel;
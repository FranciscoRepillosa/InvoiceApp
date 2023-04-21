// require mongoose
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

// create a schema for the user collection, with the following fields: username, password, products (which is an array of references to the products collection) and email

const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'products' }],
    email: String,
    clients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
});

// create a model for the schema above  

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {;
    return await bcrypt.compare(candidatePassword,userPassword);
}

userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 12)
    return next();

})

const userModel = mongoose.model('user', userSchema);

// export the model
module.exports = userModel;
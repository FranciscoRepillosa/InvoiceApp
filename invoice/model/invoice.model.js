// require mongoose
const mongoose = require('mongoose');

// create a schema for a invoice collection, with the following fields: name, description, price, category (which is a reference to the categories collection), user (which is a reference to the user collection), quantity,
// and total (which is the product of the price and quantity), user (which is a reference to the user collection), and date (which is the date the invoice was created),
// and any other fields you think are necessary

const invoiceSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'categories' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    quantity: Number,
    total: Number,
    date: Date
});

// create a model for the invoice collection

const invoiceModel = mongoose.model('invoice', invoiceSchema);

// export the model

module.exports = invoiceModel;

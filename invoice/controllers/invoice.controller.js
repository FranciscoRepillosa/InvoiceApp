// require the invoice model
const invoiceModel = require('../model/invoice.model.js');


const sendInvoice = (invoice, res) => {
    res.status(200).json(invoice);
}

const sendError = (error, res) => {
    // if the error is a validation error, send a response with a 400 status code and the error
    if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({message: 'Validation Error', error});
    }
    // if the error is a duplicate key error, send a response with a 409 status code and the error
    if (error instanceof mongoose.Error.DuplicateKey) {
        return res.status(409).json({message: 'Duplicate Key Error', error});
    }
    // otherwise, send a response with a 500 status code and the error
    res.status(500).json({message: 'Internal Server Error', error});
}

// create a function to create a new invoice and save it to the database (this function will be exported)
exports.createInvoice = (req, res) => {
    // get the data from the request body
    const {  email, total } = req.body;
    // create a new invoice object
    const invoice = new invoiceModel({
        userId: req.user._id,
        userThatHasToPayEmail: email,
        total
    });
    // save the invoice to the database
    invoice.save()
        // if the invoice is saved to the database, send a response with a 200 status code and the invoice
        .then(invoice => sendInvoice(invoice, res))
        // if there is an error, send a response with a 500 status code and the error
        .catch(error => sendError(error, res));
}

// create a function to get all invoices from the database (this function will be exported)
exports.getInvoices = (req, res) => {
    // get all invoices from the database
    invoiceModel.find()
        // if the invoices are found, send a response with a 200 status code and the invoices
        .then(invoices => sendInvoice(invoices, res))
        // if there is an error, send a response with a 500 status code and the error
        .catch(error => sendError(error, res));
}

exports.changeStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const updatedInvoice = await invoiceModel.findByIdAndUpdate(id, {status}, {new: true});

    sendInvoice(updatedInvoice, res);
}

exports.renderInvoiceList = (req, res) => {

    invoiceModel.find({userThatHasToPayEmail: req.user.email})
        .then(invoices => {
            res.render('invoice/list', { invoices });
        })
        .catch(error => sendError(error, res));
}

exports.renderAdminInvoiceList = (req, res) => {
    invoiceModel.find({userId: req.user._id})
        .then(invoices => {
            res.render('invoice/admin', { invoices });
        })
        .catch(error => sendError(error, res));
}
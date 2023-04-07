// write the routes for the following endpoints: get invoices, get invoice by id, create invoice, update invoice, delete invoice

// // require the express router
const router = require('express').Router();
const invoiceCrontroller = require('./controllers/invoice.controller.js');
const {renderTemplete} = require('../utils/renderTemplate.js');

console.log(invoiceCrontroller.createInvoice);
router.post('/', invoiceCrontroller.createInvoice);
router.get('/', invoiceCrontroller.getInvoices);
router.get('/create', renderTemplete('./invoice/create'));
router.get('/list', invoiceCrontroller.renderInvoiceList);

module.exports = router
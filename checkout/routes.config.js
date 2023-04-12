// create a route to the crete-payment-endpoint endpoint
const router = require('express').Router();
const checkoutController = require('./controllers/checkout.controller.js');
const {renderTemplete} = require('../utils/renderTemplate.js');

router.post('/create-payment-intent', checkoutController.createPaymentIntent);
router.get('/checkOutForm', renderTemplete('./checkout/checkoutForm'));

module.exports = router
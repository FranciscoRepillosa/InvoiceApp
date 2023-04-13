const stripe = require("stripe")('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
const Invoice = require('../../invoice/model/invoice.model.js');

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

exports.createPaymentIntent = async (req, res) => {

  const invoiceTotal = (await Invoice.findById(req.body.invoiceId)).total

  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: invoiceTotal,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });

};
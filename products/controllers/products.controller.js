// require the products model  located in the products/models/products.models.js file
const productsModel = require('../models/products.models');

// create a function to create a new product

// create a function that iterates over the properties of the request body and checks if the properties exist in the product schema
const checkProductData = (req, res, next) => {
    // get the data from the request body
    const { name, description, price, category } = req.body;
    // check if the name property exists in the request body
    if (!name) {
        // if the name property does not exist, send a response with a 400 status code and a message
        res.status(400).json({ message: 'name is required' });
    }   
    // check if the name property is a string
    else if (typeof name !== 'string') {
        // if the name property is not a string, send a response with a 400 status code and a message
        res.status(400).json({ message: 'name must be a string' });
    }
    // check if the name property is not an empty string
    else if (name.trim() === '') {
        // if the name property is an empty string, send a response with a 400 status code and a message
        res.status(400).json({ message: 'name cannot be an empty string' });
    }
    // check if the description property exists in the request body
    else if (!description) {
        // if the description property does not exist, send a response with a 400 status code and a message
        res.status(400).json({ message: 'description is required' });
    }
    // check if the description property is a string
    else if (typeof description !== 'string') {
        // if the description property is not a string, send a response with a 400 status code and a message
        res.status(400).json({ message: 'description must be a string' });
    }
    // check if the description property is not an empty string
    else if (description.trim() === '') {
        // if the description property is an empty string, send a response with a 400 status code and a message
        res.status(400).json({ message: 'description cannot be an empty string' });
    }
    // check if the price property exists in the request body
    else if (!price) {
        // if the price property does not exist, send a response with a 400 status code and a message
        res.status(400).json({ message: 'price is required' });
    }
    // check if the price property is a number
    else if (typeof price !== 'number') {
        // if the price property is not a number, send a response with a 400 status code and a message
        res.status(400).json({ message: 'price must be a number' });
    }
    // check if the price property is greater than 0
    else if (price <= 0) {
        // if the price property is not greater than 0, send a response with a 400 status code and a message
        res.status(400).json({ message: 'price must be greater than 0' });
    }
    // check if the category property exists in the request body
    else if (!category) {
        // if the category property does not exist, send a response with a 400 status code and a message
        res.status(400).json({ message: 'category is required' });
    }
    // check if the category property is a string
    else if (typeof category !== 'string') {
        // if the category property is not a string, send a response with a 400 status code and a message
        res.status(400).json({ message: 'category must be a string' });
    }
    // check if the category property is not an empty string
    else if (category.trim() === '') {
        // if the category property is an empty string, send a response with a 400 status code and a message
        res.status(400).json({ message: 'category cannot be an empty string' });
    }
    // if all the properties exist, call the next middleware
    else {
        next();
    }
}




const createProduct = async (req, res) => {
    // get the data from the request body
    const { name, description, price, category } = req.body;
    // create a new product
    const newProduct = new productsModel({
        name,
        description,
        price,
        category
    });
    // save the new product in the database
    await newProduct.save();
    // send the new product to the client
    res.status(201).json(newProduct);
}
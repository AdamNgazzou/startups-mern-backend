/*// filepath: /c:/Users/LENOVO/Desktop/Projects2024/Next js projects/pitchify/startups/backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const ProductModel = require('./models/product.model.js');
const productRoute = require('./routes/product.route.js');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/products', productRoute);

*/
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name : String,
    description : String,
    price : Number,
    image : String,
    alt : String,
});

const Product = mongoose.model('Product',productSchema);
module.exports = {Product};
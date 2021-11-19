const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    name: String,
    description: String,
    price: String,
    countInStock: String,
    imageUrl: String,    
})

module.exports = mongoose.model('product', productSchema);
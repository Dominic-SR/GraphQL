//const mongoose = require("mongodb");
//const Schema = mongoose.Schema;

const mongoose = require('mongoose');
const bookSchema = mongoose.Schema({
    name: String,
    genre: String,
    authorId: String
})

module.exports = mongoose.model('Book', bookSchema);
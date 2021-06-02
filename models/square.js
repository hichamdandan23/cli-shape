const mongoose = require('mongoose');

//Square Schema
const squareSchema = mongoose.Schema({
    x: Number,
    y: Number,
    length: Number
});

module.exports = mongoose.model('Square', squareSchema);
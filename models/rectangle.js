const mongoose = require('mongoose');

//Rectangle Schema
const rectangleSchema = mongoose.Schema({
    x: Number,
    y: Number,
    side1: Number,
    side2: Number
});

module.exports = mongoose.model('Rectangle', rectangleSchema);
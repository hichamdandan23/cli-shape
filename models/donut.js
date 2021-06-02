const mongoose = require('mongoose');

//Donut Schema
const donutSchema = mongoose.Schema({
    x: Number,
    y: Number,
    radius1: Number,
    radius2: Number
});

module.exports = mongoose.model('Donut', donutSchema);
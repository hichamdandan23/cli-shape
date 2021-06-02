const mongoose = require('mongoose');

//Circle Schema
const circleSchema = mongoose.Schema({
    x: Number,
    y: Number,
    radius: Number
});

module.exports = mongoose.model('Circle', circleSchema);
const mongoose = require('mongoose');

//Triangle Schema
const triangleSchema = mongoose.Schema({
    x1: Number,
    y1: Number,
    x2: Number,
    y2: Number,
    x3: Number,
    y3: Number
});

module.exports = mongoose.model('Triangle', triangleSchema);
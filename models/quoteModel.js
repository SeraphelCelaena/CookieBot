// imports
const mongoose = require('mongoose');

// Creating the Schema
const quoteSchema = new mongoose.Schema({
    guildID: {type: String, require: true},
    quoteNumber: {type: Number, require: true},
    quoteContent: {type: String, require: true}
});

// export the model
const model = mongoose.model('quotes', quoteSchema);
module.exports = model;

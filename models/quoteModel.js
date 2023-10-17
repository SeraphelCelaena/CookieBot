const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
    guildID: {type: String, require: true},
    quoteNumber: {type: Number, require: true},
    quoteContent: {type: String, require: true}
});

const quoteModel = mongoose.model('quotes', quoteSchema);
module.exports = quoteModel;

// imports
const mongoose = require('mongoose');

// creating the Schema
const customCommandSchema = new mongoose.Schema({
	guildID: {type: String, require: true},
	customCommandName: {type: String, require: true},
	customCommandResponse: {type: String, require: true},
	timesUsed: {type: Number, default: 0}
});

// Export the Model
const model = mongoose.model('customCommands', customCommandSchema);
module.exports = model;

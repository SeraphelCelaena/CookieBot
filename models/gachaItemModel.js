//Imports
const mongoose = require('mongoose');

// Creating the Schema
const gachaItemSchema = new mongoose.Schema({
	Name: {type: String, require: true},
	Weight: {type: Number, require: true, min: 0},
	Rarity: {type: String, require: true},
	Image: {type: String, require: true},
	Power: {type: Number, require: true, min: 0},
	Description: {type: String, require: true}
});

// Export the model
const model = mongoose.model('gachaItems', gachaItemSchema);
module.exports = model;

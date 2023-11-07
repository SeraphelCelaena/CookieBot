// imports
const mongoose = require('mongoose');

// Creating the Schema
const gachaUserSchema = new mongoose.Schema({
	UserID : {type: String, require: true, unique: true},
	Inventory : {type: Array, require: true, default: []},
	LastGacha : {type: Date, require: true},
	Currency : {type: Number, require: true, default: 0},
});

// Export the model
const model = mongoose.model('gachaUsers', gachaUserSchema);
module.exports = model;

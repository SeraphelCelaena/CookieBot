// imports
const mongoose = require("mongoose");

// creating the schema
const gachaProfileSchema = new mongoose.Schema({
	userID: {Type: String, require: true},
	units: {Type: Array, default: []},
	currency: {Type: Number, default: 0},
	tickets: {Type: Number, default: 0},
	wins: {Type: Number, default: 0},
	inventory: {Type: Array, default: []},
	lastGacha: {Type: Date, default: Date.now()}
});

// Export the Model
const model = mongoose.model('gachaProfile', gachaProfileSchema);
module.exports = model;
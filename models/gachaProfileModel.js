// imports
const mongoose = require("mongoose");

// creating the schema
const gachaProfileSchema = new mongoose.Schema({
	userID: {Type: String, require: true},
	characters: {Type: Array, default: []},
	currency: {Type: Number, default: 0},
	tickets: {Type: Number, default: 0},
	wins: {Type: Number, default: 0}
});

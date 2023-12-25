// imports
const mongoose = require("mongoose");

// creating the schema
const roleReactSchema = new mongoose.Schema({
	roleReactName: {type: String, require: true},
	emoji: {type: String, require: true},
	roleID: {type: String, require: true},
	messageID: {type: String, require: true}
});

// Export the Model
const model = mongoose.model('roleReact', roleReactSchema);
module.exports = model;

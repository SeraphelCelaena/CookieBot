// imports
const mongoose = require('mongoose');
const {getCurrencies} = require('../services/moneyAPI.js');

// Creating the Schema
const currencySchema = new mongoose.Schema({
	currencies: {type: String, require: true}
}, {timestamps: true});

currencySchema.statics.updateCurrency = async function() {
	const currentCurrency = await this.findOne();

	if (!currentCurrency || Date.now() - currentCurrency.updatedAt.getTime() > 86400000) {
		const data = await getCurrencies();

		await this.findOneAndUpdate({}, {currencies: JSON.stringify(data)}, {upsert: true});
	}
}

// Export the Model
const model = mongoose.model('currency', currencySchema);
module.exports = model;

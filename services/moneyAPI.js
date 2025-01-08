// imports
require('dotenv').config();
const CurrencyURL = `https://api.currencyapi.com/v3/latest?apikey=${process.env.CURRENCY_TOKEN}`

const getCurrencies = async () => {
	const response = await fetch(CurrencyURL, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const data = await response.json();
	return data;
};

module.exports = {getCurrencies};

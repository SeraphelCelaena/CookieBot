// imports
const currencyModel = require("../../models/currencyModel.js");

module.exports = {
	name: 'money',
	aliases: ['currency'],
	permissions: [],
	help: '!money [Money Amount] [Current Currency] [Convert Currency]',
	example: '!money 100 CAD USD',
	description: 'Converts money from one currency to another.',
	async execute(client, message, commandName, arguments, Discord) {
		// get the model
		await currencyModel.updateCurrency();
		const currencyRaw = await currencyModel.findOne();
		const currencyJsonRaw = JSON.parse(currencyRaw.currencies);
		const currencyJson = currencyJsonRaw.data;

		// if any of the arguments are missing
		if (arguments.length < 3) return message.channel.send("Please provide a money amount, current currency, and convert currency.");

		// get the money amount, current currency, and convert currency
		const moneyAmount = parseFloat(arguments[0]);
		const currentCurrency = arguments[1].toUpperCase();
		const convertCurrency = arguments[2].toUpperCase();

		// if the money amount is not a number
		if (isNaN(moneyAmount)) return message.channel.send("Please provide a valid money amount.");
		if (!currencyJson[currentCurrency]) return message.channel.send("Current currency not found.");
		if (!currencyJson[convertCurrency]) return message.channel.send("Convert currency not found.");

		// get the current currency rate and convert currency rate
		const currentCurrencyRate = currencyJson[currentCurrency].value;
		const convertCurrencyRate = currencyJson[convertCurrency].value;

		// convert the money amount
		const convertedAmount = moneyAmount * (convertCurrencyRate / currentCurrencyRate);

		// send the converted amount
		message.channel.send(`${moneyAmount} ${currentCurrency} is roughly equivalent to ${convertedAmount.toFixed(2)} ${convertCurrency}.`);
	}
}

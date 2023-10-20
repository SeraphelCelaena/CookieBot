//imports
const quoteModel = require('../../models/quoteModel.js');

// exports quotes
module.exports = {
	name: 'quote',
	aliases: ['q'],
	permissions: [],
	description: "shows quotes",
	async execute(client, message, commandName, arguments, Discord) {
		// variables
		let quoteArgument = arguments[0];
		const quoteCount = await quoteModel.where({guildID: message.guild.id}).countDocuments();
		const randomNumber = getRandomInteger(0, quoteCount);
		let quoteSend;

		// if !quote 0 or if !quote ends up with 0 then sends quote 0 which is hardcoded
		if (arguments[0] == 0 || ((arguments == null || arguments.join('').trim() == "") && randomNumber == 0)) {
			return message.channel.send('#0: "Mew!" -Cookie')
		}
		// if no arguments then random quote
		else if (arguments == null || arguments.join('').trim() == "") {
			quoteSend = await quoteModel.where({guildID: message.guild.id, quoteNumber: randomNumber}).findOne();
		}
		// if it gives a number or negative number it sends the specified quote
		else if (Number.isInteger(parseInt(quoteArgument))) {
			quoteArgument = parseInt(quoteArgument);
			if (Math.sign(quoteArgument) < 0) quoteArgument += quoteCount + 1; // if negative then counts from reverse
			quoteSend = await quoteModel.where({guildID: message.guild.id, quoteNumber: quoteArgument}).findOne();
		}
		// if sends a string then gives a warning to the user
		else if (typeof quoteNumber == "string" && !Number.isInteger(parseInt(quoteNumber))) {
			return message.channel.send("Do not send a string!");
		}

		// sends quote
		message.channel.send(`#${quoteSend.quoteNumber}: ${quoteSend.quoteContent}`);
	}
}

// how to get a random integer
function getRandomInteger(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

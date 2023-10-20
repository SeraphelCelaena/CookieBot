const quoteModel = require('../../models/quoteModel.js');

module.exports = {
	name: 'quote',
	aliases: ['q'],
	permissions: [],
	description: "shows quotes",
	async execute(client, message, commandName, arguments, Discord) {
		let quoteSend;
		const quoteCount = await quoteModel.where({guildID: message.guild.id}).countDocuments();
		const randomNumber = getRandomInteger(0, quoteCount);
		console.log(randomNumber);

		if (arguments[0] == 0 || ((arguments == null || arguments.join('').trim() == "") && randomNumber == 0)) {
			return message.channel.send('#0: "Mew!" -Cookie')
		}
		else if (arguments == null || arguments.join('').trim() == "") {
			quoteSend = await quoteModel.where({guildID: message.guild.id, quoteNumber: randomNumber}).findOne();
		}

		message.channel.send(`#${quoteSend.quoteNumber}: ${quoteSend.quoteContent}`);
	}
}

function getRandomInteger(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}
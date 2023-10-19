const quoteModel = require("../../models/quoteModel.js");
const {EmbedBuilder} = require('discord.js');

module.exports = {
	name: 'listquotes',
	aliases: [],
	permissions: [],
	description: "lists a certain amount of quotes",
	async execute(client, message, commandName, arguments, Discord) {
		let quoteArgument = arguments[0];
		const quotesCount = await quoteModel.where({guildID: message.guild.id}).countDocuments();
		const showAmount = 20;
		const quotesPages = Math.ceil(quotesCount / showAmount);
		const quoteEmbed = new EmbedBuilder();
		let quoteEmbedDescription = '';

		if (Number.isInteger(parseInt(quoteArgument)) || quoteArgument == null || quoteArgument.trim() == "") {
			if (quoteArgument == null || quoteArgument == "" || quoteArgument == 0) quoteArgument = 1;
			quoteArgument = parseInt(quoteArgument);
			if (Math.sign(quoteArgument) < 0) quoteArgument += quotesPages + 1;
			if (0 > quoteArgument || quoteArgument > quotesPages ) return message.channel.send("Invalid page number!");

			const remaindingQuotes = quoteArgument == quotesPages ? quotesCount % showAmount : showAmount;
			for (let i = 0; i < remaindingQuotes; i++) {
				const quoteTemp = await quoteModel.where({guildID: message.guild.id, quoteNumber: (showAmount * (quoteArgument - 1)) + i + 1}).findOne();
				quoteEmbedDescription += `#${quoteTemp.quoteNumber} - "${quoteTemp.quoteContent}"\n`;
			}


			quoteEmbed
				.setDescription(quoteEmbedDescription)
				.setTitle(`Quotes - Page ${quoteArgument}/${quotesPages}`);
			message.channel.send({embeds: [quoteEmbed]});
		}
	}
}

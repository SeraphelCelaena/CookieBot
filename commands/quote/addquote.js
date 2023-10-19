const quoteModel = require('../../models/quoteModel.js');

module.exports = {
	name: 'addquote',
	aliases: [],
	permissions: [],
	description: 'Adds a quote to the database',
	async execute(client, message, commandName, arguments, Discord) {
		if (arguments.join(" ").trim() == "" || arguments == null) {
			message.channel.send("There is nothing to quote!");
			return;
		} else if (arguments.join(" ").length > 1000) {
			message.channel.send("Too Long :(");
			return;
		}

		quoteNumber = await quoteModel.where({guildID: message.guild.id}).countDocuments() + 1;
		
		try {
			let quote = await quoteModel.create({
				guildID: message.guild.id,
				quoteNumber: quoteNumber,
				quoteContent: arguments.join(" ")
			});
			quote.save();

			message.channel.send(`Added Quote #${quoteNumber}: ${arguments.join(" ")}`);

		} catch(error) {
			console.log(`[Error] addquote - ${error}`);
		}
	}
}

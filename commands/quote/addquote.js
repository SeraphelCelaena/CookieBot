const quoteModel = require('../../models/quoteModel.js');

module.exports = {
	name: 'addquote',
	aliases: [],
	permissions: [],
	description: 'Adds a quote to the database',
	async execute(client, message, commandName, arguments, Discord) {
		try {
			if (arguments.join(" ").trim() == "" || arguments == null) {
				message.channel.send("There is nothing to quote!");
				return
			}

			let quote = await quoteModel.create({
				guildID: message.guild.id,
				quoteNumber: await quoteModel.where({guildID: message.guild.id}).countDocuments() + 1,
				quoteContent: arguments.join(" ")
			});
			quote.save();

			message.channel.send(`Added Quote: ${arguments.join(" ")}`);

		} catch(error) {
			console.log(`[Error] addquote: ${error}`);
		}
	}
}

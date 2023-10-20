// imports
const quoteModel = require('../../models/quoteModel.js');

// exports addquote
module.exports = {
	name: 'addquote',
	aliases: [],
	permissions: [],
	description: 'Adds a quote to the database',
	async execute(client, message, commandName, arguments, Discord) {
		// variables
		let maxLength = 1000;

		// if sends nothing then nothing happens and warns user
		if (arguments.join(" ").trim() == "" || arguments == null) {
			return message.channel.send("There is nothing to quote!");
		}
		// if the quote is too long then warns user
		else if (arguments.join(" ").length > maxLength) {
			return message.channel.send(`Too Long: String must be shorter than ${maxLength}, yours is ${arguments.join(" ").length}`);
		}

		// temporary total quote count
		quoteCount = await quoteModel.where({guildID: message.guild.id}).countDocuments() + 1;
		
		// tries to upload the quote
		try {
			let quote = await quoteModel.create({
				guildID: message.guild.id,
				quoteNumber: quoteCount,
				quoteContent: arguments.join(" ")
			});
			quote.save();

			// if successful then sends a confirmation quote
			message.channel.send(`Added Quote #${quoteCount}: ${arguments.join(" ")}`);

		} catch(error) {
			console.log(`[Error] addquote - ${error}`);
		}
	}
}

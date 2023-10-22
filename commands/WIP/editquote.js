// imports
const quoteModel = require('../../models/quoteModel.js');

module.exports = {
	name: 'editquote',
	aliases: [],
	permissions: [],
	description: 'edits a quote.',
	async execute(client, message, commandName, arguments, Discord) {
		// variables
		const quoteCount = await quoteModel.where({guildID: message.guild.id}).countDocuments();
		const quoteNumber = arguments[0];
		const quoteEdit = arguments.slice(1).join(" ");

		// if sends nothin then gives warning
		if (quoteNumber == null || quoteNumber.trim() == "") {
			return message.channel.send("Specify a quote to edit!");
		}
		// if sends a 0 or negative number then gives warning
		else if (Number.isInteger(parseInt(quoteNumber)) && Math.sign(quoteNumber) != 1) {
			return message.channel.send("Cannot delete 0/negative quotes!");
		}
		// if sends a string then gives warning
		else if (typeof quoteNumber == "string" && !Number.isInteger(parseInt(quoteNumber))) {
			return message.channel.send("Don't send string!")
		}
	}
}

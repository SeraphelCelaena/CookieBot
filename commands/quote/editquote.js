// imports
const quoteModel = require('../../models/quoteModel.js');
require('dotenv').config();

module.exports = {
	name: 'editquote',
	aliases: [],
	permissions: [],
	description: 'edits a quote.',
	async execute(client, message, commandName, arguments, Discord) {
		// variables
		const quoteNumber = arguments[0];
		const quoteEditContent = arguments.slice(1).join(" ");

		// if sends nothin then gives warning
		if (quoteNumber == null || quoteNumber.trim() == "") {
			return message.channel.send("Specify a quote to edit!");
		}
		// if sends a 0 or negative number then gives warning
		else if (Number.isInteger(parseInt(quoteNumber)) && Math.sign(quoteNumber) != 1) {
			return message.channel.send("Cannot edit 0/negative quotes!");
		}
		// if sends a string then gives warning
		else if (typeof quoteNumber == "string" && !Number.isInteger(parseInt(quoteNumber))) {
			return message.channel.send("Select a valid quote!")
		}
		// if does not send what to replace with then warning
		else if (!quoteEditContent) {
			return message.channel.send("Specify a response for the command!");
		}
		// if too long then yells at user
		else if (arguments.join(" ").length > process.env.MAX_QUOTE_LENGTH) {
			return message.channel.send(`Too Long: String must be shorter than ${process.env.MAX_QUOTE_LENGTH}, yours is ${arguments.join(" ").length}`);
		}

		try {
			// attempts to take the quote from database, if not found yells at user.
			const quoteEdit = await quoteModel.where({guildID: message.guild.id, quoteNumber: quoteNumber}).findOne();
			if (!quoteEdit) return message.channel.send("Enter a valid quote!");

			// edits quote in database
			await quoteModel.where({guildID: quoteEdit.guildID, quoteNumber: quoteEdit.quoteNumber}).updateOne({}, {}).set({quoteContent: quoteEditContent})

			// success message!
			message.channel.send(`Edited quote #${quoteEdit.quoteNumber}: ${quoteEditContent}`);

		} catch(error) {
			console.log(`[ERROR] editquote - ${error}`)
		}
	}
}

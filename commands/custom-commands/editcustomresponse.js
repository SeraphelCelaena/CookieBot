// imports
const customCommandModel = require("../../models/customCommandModel.js");
require('dotenv').config();

module.exports = {
	name: 'editcustomresponse',
	aliases: ['editcommandresponse'],
	permissions: [],
	description: 'Edits a custom command response.',
	async execute(client, message, commandName, arguments, Discord) {
		// variabled
		const commandNameEdit = arguments[0];
		const commandResponseEditContent = arguments.slice(1).join(" ");

		// if sends nothin then gives warn
		if (commandNameEdit == null) {
			return message.channel.send("Specify a command to edit!");
		}
		// if sends only the command name
		else if (!commandResponseEditContent) {
			return message.channel.send("Specify a response for the command!");
		}
		// if makes edit too long
		else if (commandResponseEditContent.length > process.env.MAX_QUOTE_LEGNTH) {
			return message.channel.send(`Too long: String must be shorter than ${process.env.MAX_QUOTE_LEGNTH}, yours is ${commandNameEdit.length}`);
		}

		try {
			// attempts to find command from database, if cant then cookie yells at user
			const commandEdit = await customCommandModel.where({guildID: message.guild.id, customCommandName: commandNameEdit}).findOne();
			if (!commandEdit) return message.channel.send("Enter a valid command!");

			// edits command
			await customCommandModel.where({guildID: commandEdit.guildID, customCommandName: commandEdit.customCommandName}).updateOne({}, {}).set({customCommandResponse: commandResponseEditContent});

			// success message
			message.channel.send(`Edited command ${commandEdit.customCommandName} => ${commandResponseEditContent}`);
		}
		catch(error) {
			console.log(`[ERROR] editcustomname - ${error}`);
		}
	}
}

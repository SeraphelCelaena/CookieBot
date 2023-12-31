// imports
const customCommandModel = require("../../models/customCommandModel.js");
require('dotenv').config();

module.exports = {
	name: 'editcustomname',
	aliases: ['editcommandname'],
	permissions: [],
	help: '!editcustomname [Command Name] [New Name]',
	description: 'Edits a custom command name.',
	async execute(client, message, commandName, arguments, Discord) {
		// variabled
		const commandNameEdit = arguments[0];
		const commandNameEditContent = arguments[1];

		// if sends nothin then gives warn
		if (commandNameEdit == null) {
			return message.channel.send("Specify a command to edit!");
		}
		// if sends only the command name
		else if (!commandNameEditContent) {
			return message.channel.send("Specify a response for the command!");
		}
		// if makes edit too long
		else if (commandNameEditContent.length > process.env.MAX_QUOTE_LEGNTH) {
			return message.channel.send(`Too long: String must be shorter than ${process.env.MAX_QUOTE_LEGNTH}, yours is ${commandNameEdit.length}`);
		}

		try {
			// attempts to find command from database, if cant then cookie yells at user
			const commandEdit = await customCommandModel.where({guildID: message.guild.id, customCommandName: commandNameEdit}).findOne();
			if (!commandEdit) return message.channel.send("Enter a valid command!");

			// edits command
			await customCommandModel.where({guildID: commandEdit.guildID, customCommandName: commandEdit.customCommandName}).updateOne({}, {}).set({customCommandName: commandNameEditContent});

			// success message
			message.channel.send(`Edited command ${commandEdit.customCommandName} => ${commandNameEditContent}`);
		}
		catch(error) {
			console.log(`[ERROR] editcustomname - ${error}`);
		}
	}
}

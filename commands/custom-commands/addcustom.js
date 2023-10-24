// imports
const customCommands = require("../../models/customCommandModel.js");
require('dotenv').config();

module.exports = {
	name: 'addcustom',
	aliases: ['addcommand'],
	permissions: [],
	description: 'Adds a custom command.',
	async execute(client, message, commandName, arguments, Discord) {
		// variables
		const commandNameSet = arguments[0].toLowerCase();
		const commandResponseSet = arguments.slice(1).join(' ');

		// Checks and balances
		if (!commandNameSet) {
			return message.channel.send('Specify a custom command name!');
		}
		else if (!commandResponseSet) {
			return message.channel.send('Specify a response for the command!')
		}
		// Checks to see if string is too long
		else if (commandResponseSet.length > process.env.MAX_QUOTE_LENGTH || commandNameSet.length > process.env.MAX_QUOTE_LENGTH) {
			return message.channel.send(`Too Long: String must be shorter than ${process.env.MAX_QUOTE_LENGTH}, yours is ${commandResponseSet.length}`)
		}

		// Try to find duplicates
		try {
			const findCustomCommand = await customCommands.where({guildID: message.guild.id, customCommandName: commandNameSet}).findOne();
			if (findCustomCommand) {
				return message.channel.send(`You already have command: ${commandNameSet}`);
			}
			// Upload quote to database
			else {
				let command = await customCommands.create({
					guildID: message.guild.id,
					customCommandName: commandNameSet,
					customCommandResponse: commandResponseSet
				});
				command.save();
				message.channel.send(`Created new command: ${commandNameSet} - ${commandResponseSet}`);
			}

		} catch(error) {
			console.log(`[Error] addcustom - ${error}`);
		}
	}
}

// imports
const fs = require('fs');
const customCommandModel = require("../../models/customCommandModel.js");
require('dotenv').config();

module.exports = {
	name: 'addcustom',
	aliases: ['addcommand'],
	permissions: [],
	help: '!addcustom [Command Name] [Command Response]',
	description: 'Adds a custom command.',
	async execute(client, message, commandName, arguments, Discord) {
		// variables
		let commandNameSet = arguments[0];
		const commandResponseSet = arguments.slice(1).join(' ');

		// Checks and balances
		if (!commandNameSet) {
			return message.channel.send('Specify a custom command name!');
		}
		else if (!commandResponseSet) {
			return message.channel.send('Specify a response for the command!')
		}
		// Checks to see if string is too long
		else if (commandResponseSet.length > process.env.MAX_QUOTE_LENGTH) {
			return message.channel.send(`Too Long: String must be shorter than ${process.env.MAX_QUOTE_LENGTH}, yours is ${commandResponseSet.length}`)
		}
		else if (commandNameSet.length > process.env.MAX_QUOTE_LENGTH) {
			return message.channel.send(`Too Long: String must be shorter than ${process.env.MAX_QUOTE_LENGTH}, yours is ${commandNameSet.length}`)
		}

		// makes the thing consistent
		commandNameSet = commandNameSet.toLowerCase();

		// "real" command finder
		const commandsFolder = fs.readdirSync('./commands');
		let realCommands = [];
		for (const folder of commandsFolder) {
			const commandFiles = fs.readdirSync(`./commands/${folder}`);
			if (!commandFiles.length == 0) {
				for (const file of commandFiles) {
					realCommands.push(file);
				}
			}
		}

		// Try to find duplicates
		try {
			const findCustomCommand = await customCommandModel.where({guildID: message.guild.id, customCommandName: commandNameSet}).findOne();
			if (findCustomCommand || realCommands.includes(`${commandNameSet}.js`)) {
				return message.channel.send(`You already have command: ${commandNameSet}`);
			}
			// Upload quote to database
			else {
				let command = await customCommandModel.create({
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

// imports
const fs = require('fs');
const {EmbedBuilder} = require('discord.js');

module.exports = {
	name: 'help',
	aliases: ['h'],
	permissions: [],
	help: '!help [Command Name]',
	description: 'displays the command and how to use it.',
	async execute(client, message, commandName, arguments, Discord) {
		// variables
		const commandsFolder = fs.readdirSync('./commands');
		const helpEmbed = new EmbedBuilder();
		const command = arguments[0];
		let embedText = "";

		if (!command) return message.channel.send("Specify a command you need help with!");

		let foundCommand = null;
		client.commands.forEach(cmd => {
			if (cmd.name == command || cmd.aliases.includes(command)) {
				foundCommand = cmd;
			}
		})

		if (!foundCommand) return message.channel.send("Command not found!");

		// loops through aliases
		embedText += `**Aliases**: `;
		for (var alias of foundCommand.aliases) {
			embedText += `\`${alias}\` `;
		}

		// adds stuph to the embed text
		if (foundCommand.description) embedText += `\n**Description:**\n${foundCommand.description}`;
		if (foundCommand.help) embedText += `\n**Usage:**\n\`${foundCommand.help}\``;
		if (foundCommand.example) embedText += `\n**Example:**\n\`${foundCommand.example}\``;

		// makes the embed
		helpEmbed
			.setColor(0xFF1199)
			.addFields({name: foundCommand.name, value: embedText});

		// sends embed
		message.channel.send({embeds: [helpEmbed]});
	}
}

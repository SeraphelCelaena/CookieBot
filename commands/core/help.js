// imports
const {EmbedBuilder} = require('discord.js');
require('dotenv').config();

module.exports = {
	name: 'help',
	aliases: ['h'],
	permissions: [],
	help: '!help [Command Name]',
	description: 'displays the command and how to use it.',
	async execute(client, message, commandName, arguments, Discord) {
		// variables
		const helpEmbed = new EmbedBuilder();
		const command = arguments[0];
		let helpHeader = "";
		let embedText = "";

		if (!command) return message.channel.send("Specify a command you need help with!");

		// checks if the command exists
		let commandSearch = client.commands.get(command);
		if (!commandSearch) {
			client.commands.map((cmd) => {
				if (cmd.aliases.includes(command)) {
					commandSearch = cmd;
					return;
				}
			});
		}

		// if the command still doesn't exist
		if (!commandSearch) return message.channel.send("That command does not exist!");

		helpHeader = `Command Info: ${process.env.PREFIX}${commandSearch.name}`;

		// loops through aliases
		embedText += `**Aliases**: `;
		for (var alias of commandSearch.aliases) {
			embedText += `\`${alias}\` `;
		}

		// adds stuph to the embed text
		embedText += `\n**Description:**\n${commandSearch.description}\n`;
		embedText += `\n**Usage:**\n\`${commandSearch.help}\``;

		// makes the embed
		helpEmbed
			.setColor(0xFF1199)
			.addFields({name: helpHeader, value: embedText});

		// sends embed
		message.channel.send({embeds: [helpEmbed]});
	}
}

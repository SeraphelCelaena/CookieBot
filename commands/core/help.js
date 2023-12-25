// imports
const fs = require('fs');
const {EmbedBuilder} = require('discord.js');

module.exports = {
	name: 'help',
	aliases: ['h'],
	permissions: [],
	help: '!help [Command Name]',
	description: '[TODO] displays the command and how to use it.',
	async execute(client, message, commandName, arguments, Discord) {
		// variables
		const commandsFolder = fs.readdirSync('./commands');
		const helpEmbed = new EmbedBuilder();
		const command = arguments[0];
		let embedText = "";

		if (!command) return message.channel.send("Specify a command you need help with!");

		// loops through aliases
		embedText += `**Aliases**: `;
		for (var alias of client.commands.get(command).aliases) {
			embedText += `\`${alias}\` `;
		}

		// adds stuph to the embed text
		embedText += `\n**Usage:**\n\`${client.commands.get(command).help}\``;

		// makes the embed
		helpEmbed
			.setColor(0xFF1199)
			.addFields({name: client.commands.get(command).name, value: embedText});

		// sends embed
		message.channel.send({embeds: [helpEmbed]});
	}
}

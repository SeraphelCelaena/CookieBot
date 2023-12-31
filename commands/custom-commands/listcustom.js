// imports
const { EmbedBuilder } = require('discord.js');
const customCommandModel = require('../../models/customCommandModel.js');

module.exports = {
	name: 'listcustom',
	aliases: ['listcommands', 'customcommands'],
	permissions: [],
	help: '!listcustom [Page Number(Optional)]',
	description: 'Lists the custom commands.',
	async execute(client, message, commandName, arguments, Discord) {
		// variables
		const customEmbed = new EmbedBuilder();
		const customCommandsList = await customCommandModel.where({guildID: message.guild.id}).find();
		let customEmbedDescription = '';

		// Starts the Embed
		customEmbed
			.setTitle("Custom Commands")
			.setColor(0xFF1199);

		// if empty returns a empty string
		if (customCommandsList.length == 0) {
			customEmbed.setDescription("No custom commands!");
			return message.channel.send({embeds: [customEmbed]});
		}

		// loops through the custom command list
		for (const command of customCommandsList) {
			customEmbedDescription += `${command.timesUsed} - !${command.customCommandName}\n`
		}

		// Finish the embed
		customEmbed
			.setDescription(customEmbedDescription);

		// Sends the embed
		message.channel.send({embeds: [customEmbed]});
	}
}

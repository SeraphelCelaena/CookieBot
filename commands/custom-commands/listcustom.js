// imports
const { EmbedBuilder } = require('discord.js');
const customCommandModel = require('../../models/customCommandModel.js');

module.exports = {
	name: 'listcustom',
	aliases: ['listcommands', 'customcommands'],
	permissions: [],
	description: '[PLANNED] Lists the custom commands.',
	async execute(client, message, commandName, arguments, Discord) {
		// variables
		const customEmbed = new EmbedBuilder();
		const customCommandsList = await customCommandModel.where({guildID: message.guild.id}).find();
		
		// loops through the custom command list
		for (const command of customCommandsList) {
			
		}
	}
}

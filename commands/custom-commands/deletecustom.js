// imports
const customCommandModel = require('../../models/customCommandModel.js');

module.exports = {
	name: 'deletecustom',
	aliases: ['deletecommand', 'removecustom', 'removecommand', 'delcustom', 'delcommand'],
	permissions: [],
	help: '!deletecustom [Command Name]',
	description: 'Deletes custom command.',
	async execute(client, message, commandName, arguments, Discord) {
		// variables
		const commandNameRemove = arguments[0];

		// checks and balances
		if (!commandNameRemove) return message.channel.send("Specify a command to remove!");

		// tries to find command in custom command database, if not yells at user
		const commandRemove = await customCommandModel.where({guildID: message.guild.id, customCommandName: commandNameRemove.toLowerCase()}).findOne();
		if (!commandRemove) return message.channel.send('Could not find command to delete');

		// tries to delete command
		try {
			await customCommandModel.findOneAndDelete({guildID: commandRemove.guildID, customCommandName: commandRemove.customCommandName});
			message.channel.send(`Deleted command: ${commandRemove.customCommandName}`);
		}
		catch(error) {
			console.log(`[ERROR] deletecustom - ${error}`);
		}
	}
}

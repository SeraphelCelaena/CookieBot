module.exports = {
	name: 'listcustom',
	aliases: ['listcommands'],
	permissions: [],
	description: '[PLANNED] Lists the custom commands.',
	async execute(client, message, commandName, arguments, Discord) {
		message.channel.send(`${commandName} is planned to be implemented.`);
	}
}

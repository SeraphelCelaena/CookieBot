module.exports = {
	name: 'listcustom',
	aliases: [],
	permissions: [],
	description: 'Lists the custom commands.',
	async execute(client, message, commandName, arguments, Discord) {
		message.channel.send(`${commandName} is planned to be implemented.`);
	}
}

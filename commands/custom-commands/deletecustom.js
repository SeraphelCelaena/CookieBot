module.exports = {
	name: 'deletecustom',
	aliases: ['deletecommand'],
	permissions: [],
	description: '[PLANNED] Deletes custom command.',
	async execute(client, message, commandName, arguments, Discord) {
		message.channel.send(`${commandName} is planned to be implemented.`);
	}
}

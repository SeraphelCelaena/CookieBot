module.exports = {
	name: 'editcustomname',
	aliases: ['editcommandname'],
	permissions: [],
	description: 'Edits a custom command name.',
	async execute(client, message, commandName, arguments, Discord) {
		message.channel.send(`${commandName} is planned to be implemented.`);
	}
}

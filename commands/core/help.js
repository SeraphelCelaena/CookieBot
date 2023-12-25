module.exports = {
	name: 'help',
	aliases: ['h'],
	permissions: [],
	description: '[TODO] displays the command and how to use it.',
	async execute(client, message, commandName, arguments, Discord) {
		message.channel.send(`${commandName} is planned to be implemented.`);
	}
}

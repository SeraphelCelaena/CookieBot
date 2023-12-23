module.exports = {
	name: 'dummy',
	aliases: [],
	permissions: [],
	description: 'does nothing',
	async execute(client, message, commandName, arguments, Discord) {
		message.channel.send(`${commandName} is planned to be implemented.`);
	}
}

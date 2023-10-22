module.exports = {
	name: 'addcustom',
	aliases: ['addcommand'],
	permissions: [],
	description: 'Adds a custom command.',
	async execute(client, message, commandName, arguments, Discord) {
		message.channel.send(`${commandName} is planned to be implemented.`);
	}
}

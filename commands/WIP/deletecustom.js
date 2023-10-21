module.exports = {
	name: 'deletecustom',
	aliases: ['deletecommand'],
	permissions: [],
	description: 'Deletes custom command.',
	async execute(client, message, commandName, arguments, Discord) {
		message.channel.send(`${commandName} is work in progress.`);
	}
}
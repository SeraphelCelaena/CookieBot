module.exports = {
	name: 'editquote',
	aliases: [],
	permissions: [],
	description: 'edits a quote.',
	async execute(client, message, commandName, arguments, Discord) {
		message.channel.send(`${commandName} is work in progress.`);
	}
}
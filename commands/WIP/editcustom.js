module.exports = {
	name: 'editcustom',
	aliases: ['editcommand'],
	permissions: [],
	description: 'Edits a custom command.',
	async execute(client, message, commandName, arguments, Discord) {
		message.channel.send(`${commandName} is work in progress.`);
	}
}
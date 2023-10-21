module.exports = {
	name: '',
	aliases: [],
	permissions: [],
	description: '',
	async execute(client, message, commandName, arguments, Discord) {
		message.channel.send(`${commandName} is work in progress.`);
	}
}
module.exports = {
	name: 'quote',
	aliases: ['q'],
	permissions: [],
	description: "shows quotes",
	async execute(client, message, commandName, arguments, Discord) {
		message.channel.send(`${commandName} is Work In Progress`);
	}
}

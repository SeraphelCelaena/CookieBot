module.exports = {
	name: 'listquotes',
	aliases: [],
	permissions: [],
	description: "lists quotes",
	async execute(client, message, commandName, arguments, Discord) {
		message.channel.send(`${commandName} is Work In Progress`);
	}
}

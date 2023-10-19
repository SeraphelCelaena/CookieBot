module.exports = {
	name: 'editquote',
	aliases: [],
	permissions: [],
	description: "Edits a specified quote in the database",
	async execute(client, message, commandName, arguments, Discord) {
		message.channel.send(`${commandName} is Work In Progress`);
	}
}

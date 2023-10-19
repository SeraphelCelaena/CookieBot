module.exports = {
	name: 'commands',
	aliases: ['cmds', 'help'],
	permissions: [],
	description: "shows list of commands",
	async execute(client, message, commandName, arguments, Discord) {
		message.channel.send(`${commandName} is Work In Progress`);
	}
}

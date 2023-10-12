module.exports = {
	name: 'mew',
	aliases: [],
	permissions: [],
	description: "Cookie Sez Mew!",
	async execute(client, message, cmd, args, Discord) {
		message.channel.send("Mew!");
	}
}

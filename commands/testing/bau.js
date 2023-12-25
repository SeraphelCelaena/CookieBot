module.exports = {
	name: "bau",
	aliases: [],
	permissions: [],
	help: '!bau',
	description: "Cookie will speak in his native language",
	async execute(client, message, commandName, arguments, Discord) {
		message.reply(
			"WOOF BAU! (means hello) <:CookieLoveRed:1131049937505886320>"
		);
	}
};

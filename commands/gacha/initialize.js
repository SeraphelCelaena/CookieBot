module.exports = {
	name: 'initalize',
	aliases: ["init"],
	permissions: [],
	description: '',
	async execute(client, message, commandName, arguments, Discord) {
		message.channel.send(`${commandName} is planned to be implemented.`);
		// probably something like "choose a starter" like how gachatao does
	}
}

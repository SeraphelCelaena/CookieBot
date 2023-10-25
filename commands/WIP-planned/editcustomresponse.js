module.exports = {
	name: 'editcustomresponse',
	aliases: ['editcommandresponse'],
	permissions: [],
	description: '[PLANNED] Edits a custom command reponse.',
	async execute(client, message, commandName, arguments, Discord) {
		message.channel.send(`${commandName} is planned to be implemented.`);
	}
}

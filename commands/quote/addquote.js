const quoteModel = require('../../models/quoteModel.js');

module.exports = {
	name: 'addquote',
	aliases: [],
	permissions: [],
	description: 'Adds a quote to the database',
	async execute(client, message, commandName, arguments, Discord) {
		console.log(`client: ${client}\nmessage: ${message}\ncommand: ${cmds}\narguments: ${args}\nDiscord: ${Discord}\n`);

		let quoteContent = args.join(" ");

		try {
			let command = await quoteModel.create({
				guildID: message.guild.id,
				quoteNumber: await quoteModel.find({guildID: message.guild.id}).estimatedDocumentCount(),
				quoteContent: quoteContent
			});
			quoteModel.save();
		} catch(error) {
			console.log(`[Error] addquote: ${error}`);
		}
	}
}

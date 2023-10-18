const quoteModel = require('../../models/quoteModel.js');

module.exports = {
	name: 'deletequote',
	aliases: ['delquote'],
	permisssions: [],
	description: 'Deletes a quote',
	async execute(client, message, commandName, arguments, Discord) {
		quoteCount = await quoteModel.where({guildID: message.guild.id}).countDocuments();
		quoteNumber = arguments[0];

		console.log(quoteCount);
		console.log(quoteNumber);

		if (arguments.join(" ").trim() == "" || arguments == null) {
			message.channel.send("Specify a quote to delete!");
			return;
		} else if (Number.isInteger(parseInt(quoteNumber)) && Math.sign(quoteNumber) != 1) {
			message.channel.send("Cannot delete 0/negative quotes!");
			return
		} else if (typeof quoteNumber == "string" && !Number.isInteger(parseInt(quoteNumber))) {
			message.channel.send("Don't send string")
		} else {
			message.channel.send(`Chomping Quote #${quoteNumber}`)
		}

		try {
			
		} catch(error) {
			console.log(`[Error] deletequote - ${error}`);
		}
	}
}
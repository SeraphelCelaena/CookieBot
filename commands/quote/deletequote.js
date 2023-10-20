const quoteModel = require('../../models/quoteModel.js');

module.exports = {
	name: 'deletequote',
	aliases: ['delquote', 'removequote'],
	permissions: [],
	description: 'Deletes a quote',
	async execute(client, message, commandName, arguments, Discord) {
		quoteCount = await quoteModel.where({guildID: message.guild.id}).countDocuments();
		quoteNumber = arguments[0];

		if (arguments.join(" ").trim() == "" || arguments == null) {
			message.channel.send("Specify a quote to delete!");
			return;
		}
		else if (Number.isInteger(parseInt(quoteNumber)) && Math.sign(quoteNumber) != 1) {
			message.channel.send("Cannot delete 0/negative quotes!");
			return;
		}
		else if (typeof quoteNumber == "string" && !Number.isInteger(parseInt(quoteNumber))) {
			message.channel.send("Don't send string!")
			return;
		}

		try {
			const quoteDelete = await quoteModel.where({guildID: message.guild.id, quoteNumber: quoteNumber}).findOne();
			if (!quoteDelete) return message.channel.send("Invalid quote number");

			for (let i = 0; i < quoteCount; i++) {
				const quoteTemp = await quoteModel.where({guildID: message.guild.id, quoteNumber: i + 1}).findOne();

				if (quoteTemp.quoteNumber == quoteDelete.quoteNumber) {
					await quoteModel.findOneAndDelete({guildID: quoteTemp.guildID, quoteNumber: quoteTemp.quoteNumber});
				}
				else if (quoteTemp.quoteNumber > quoteNumber) {
					await quoteModel.where({guildID: quoteTemp.guildID, quoteNumber: quoteTemp.quoteNumber}).updateOne({}, {}).set({quoteNumber: quoteTemp.quoteNumber - 1});
				}
			}
			message.channel.send(`Deleted Quote #${quoteNumber}: ${quoteDelete.quoteContent}`);

		} catch(error) {
			console.log(`[Error] deletequote - ${error}`);
		}
	}
}

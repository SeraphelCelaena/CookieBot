// imports
const quoteModel = require('../../models/quoteModel.js');

// eports deletequote
module.exports = {
	name: 'deletequote',
	aliases: ['delquote', 'removequote'],
	permissions: [],
	description: 'Deletes a quote',
	async execute(client, message, commandName, arguments, Discord) {
		// variabled
		quoteCount = await quoteModel.where({guildID: message.guild.id}).countDocuments();
		quoteNumber = arguments[0];

		// if sends nothin then gives warning
		if (arguments.join(" ").trim() == "" || arguments == null) {
			return message.channel.send("Specify a quote to delete!");
		}
		// if sends a 0 or negative number then gives warning
		else if (Number.isInteger(parseInt(quoteNumber)) && Math.sign(quoteNumber) != 1) {
			return message.channel.send("Cannot delete 0/negative quotes!");
		}
		// if sends a string then gives warning
		else if (typeof quoteNumber == "string" && !Number.isInteger(parseInt(quoteNumber))) {
			return message.channel.send("Don't send string!")
		}

		try {
			// finds a quote if possible, if not tehn gives error
			const quoteDelete = await quoteModel.where({guildID: message.guild.id, quoteNumber: quoteNumber}).findOne();
			if (!quoteDelete) return message.channel.send("Invalid quote number");

			// loops through all the quotes that have a bigger number than quoteDelete then reduces their number by one
			for (let i = 0; i < quoteCount; i++) {
				const quoteTemp = await quoteModel.where({guildID: message.guild.id, quoteNumber: i + 1}).findOne();

				// if quoteNumber is equal to quotedelete then deletes the quote
				if (quoteTemp.quoteNumber == quoteDelete.quoteNumber) {
					await quoteModel.findOneAndDelete({guildID: quoteTemp.guildID, quoteNumber: quoteTemp.quoteNumber});
				}
				// reduces number of quotes with a greater number than deleted quote
				else if (quoteTemp.quoteNumber > quoteNumber) {
					await quoteModel.where({guildID: quoteTemp.guildID, quoteNumber: quoteTemp.quoteNumber}).updateOne({}, {}).set({quoteNumber: quoteTemp.quoteNumber - 1});
				}
			}
			//confirms that the quote is deleted
			message.channel.send(`Deleted Quote #${quoteNumber}: ${quoteDelete.quoteContent}`);

		} catch(error) {
			console.log(`[Error] deletequote - ${error}`);
		}
	}
}

// imports
const quoteModel = require("../../models/quoteModel.js");
const {EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, StringSelectMenuOptionBuilder} = require('discord.js');

// exports listquotes
module.exports = {
	name: 'listquotes',
	aliases: [],
	permissions: [],
	description: "lists a certain amount of quotes",
	async execute(client, message, commandName, arguments, Discord) {
		// variables
		let quoteArgument = arguments[0];
		const quotesCount = await quoteModel.where({guildID: message.guild.id}).countDocuments();
		const showAmount = 20;
		const quotesPages = Math.ceil(quotesCount / showAmount);

		// embed
		const quoteEmbed = new EmbedBuilder();
		let quoteEmbedDescription = '';

		// Buttons
		const previousButton = new ButtonBuilder()
			.setStyle(ButtonStyle.Primary)
			.setLabel("<<<")
			.setCustomId("previousButton");

		const nextButton = new ButtonBuilder()
			.setStyle(ButtonStyle.Primary)
			.setLabel(">>>")
			.setCustomId("nextButton");
		
		// Select menu
		const quoteListMenu = new StringSelectMenuBuilder()
			.setCustomId("Page");
		
		for (let i = 1; i <= quotesPages; i++) {
			const quoteListMenuOption = new StringSelectMenuOptionBuilder()
				.setLabel(i.toString())
				.setValue(i.toString());
			quoteListMenu.addOptions(quoteListMenuOption);
		}

		// Action row
		const row = new ActionRowBuilder()
			.addComponents(quoteListMenu);

		// if sends a number then does the command
		if (Number.isInteger(parseInt(quoteArgument)) || quoteArgument == null || quoteArgument.trim() == "") {
			// filtering the file
			if (quoteArgument == null || quoteArgument == "" || quoteArgument == 0) quoteArgument = 1; // if sends nothing or 0 then sends first page of quotes
			quoteArgument = parseInt(quoteArgument);
			if (Math.sign(quoteArgument) < 0) quoteArgument += quotesPages + 1; // if negative then finds from the back
			if (0 > quoteArgument || quoteArgument > quotesPages ) return message.channel.send("Error 404: Page not found! <:marchcamera:1102793347132829736>"); // if invalid quote page then sends error

			// how to send quotes
			const remaindingQuotes = quoteArgument == quotesPages ? quotesCount % showAmount : showAmount;
			for (let i = 0; i < remaindingQuotes; i++) {
				const quoteTemp = await quoteModel.where({guildID: message.guild.id, quoteNumber: (showAmount * (quoteArgument - 1)) + i + 1}).findOne();
				quoteEmbedDescription += `#${quoteTemp.quoteNumber} - ${quoteTemp.quoteContent}\n`;
			}

			// makes the embed to send
			quoteEmbed
				.setDescription(quoteEmbedDescription)
				.setColor(0xFF1199)
				.setTitle(`Quotes - Page ${quoteArgument}/${quotesPages}`);

			// sends the embed
			message.channel.send({embeds: [quoteEmbed], components: [row]});
		}
		// if sends a sting then gives the user a warning
		else if (typeof quoteNumber == "string" && !Number.isInteger(parseInt(quoteNumber))) {
			message.channel.send("Do not send a string!");
		}
	}
}

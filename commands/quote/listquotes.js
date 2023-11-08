// imports
const quoteModel = require("../../models/quoteModel.js");
const {EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder} = require('discord.js');

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
		let sentMessage;
		let continueInteraction = true;

		// String Validation
		if (typeof quoteArgument == "string" && !Number.isInteger(parseInt(quoteArgument))) {
			message.channel.send("Do not send a string!");
		}
		else if (quoteArgument == null || quoteArgument == "" || quoteArgument == 0) {
			quoteArgument = 1; // if sends nothing or 0 then sends first page of quotes
		}
		else
		{
			quoteArgument = parseInt(quoteArgument); // if sends a number then parses it
		}

		// Select menu
		quoteListMenu = await actionBar(quotesPages, quoteArgument);

		// Action row
		const row = new ActionRowBuilder()
			.addComponents(quoteListMenu);

		// if sends a number then does the command
		quoteEmbed = await quotePage(quoteArgument, quotesPages, showAmount, message, quotesCount);
		sentMessage = await message.channel.send({embeds: [quoteEmbed], components: [row]});

		// Action Bar Interactions
		while (continueInteraction) {
			try {
				const collectorFilter = interaction => interaction.user.id == message.author.id;
				const confirmation = await sentMessage.awaitMessageComponent({filter: collectorFilter, time: 60000});
				console.log(confirmation);

				if (confirmation.customId === 'Page') {
					confirmation.deferUpdate();
					quoteEmbed = await quotePage(parseInt(confirmation.values[0]), quotesPages, showAmount, message, quotesCount);
					quoteListMenu = await actionBar(quotesPages, parseInt(confirmation.values[0]));
					row.setComponents(quoteListMenu);
					sentMessage.edit({embeds: [quoteEmbed], components: [row]});
				}
			}
			catch (error) {
				console.log(error);
				quoteListMenu.setDisabled(true); // disable the menu if there's an error or the time runs out
				sentMessage.edit({embeds: [quoteEmbed], components: [row]});
				continueInteraction = false;
			}
		}
	}
}

const quotePage = async (pageNumber, quotesPages, showAmount, message, quotesCount) => {
	const quoteEmbed = new EmbedBuilder();
	let quoteEmbedDescription = '';

	if (pageNumber == null || Number.isInteger(pageNumber)) {
		// filtering the file
		if (Math.sign(pageNumber) < 0) pageNumber += quotesPages + 1; // if negative then finds from the back
		if (0 > pageNumber || pageNumber > quotesPages ) return message.channel.send("Error 404: Page not found! <:marchcamera:1102793347132829736>"); // if invalid quote page then sends error

		// how to send quotes
		const remaindingQuotes = pageNumber == quotesPages ? quotesCount % showAmount : showAmount;
		for (let i = 0; i < remaindingQuotes; i++) {
			const quoteTemp = await quoteModel.where({guildID: message.guild.id, quoteNumber: (showAmount * (pageNumber - 1)) + i + 1}).findOne();
			quoteEmbedDescription += `#${quoteTemp.quoteNumber} - ${quoteTemp.quoteContent}\n`;
		}

		// makes the embed to send
		quoteEmbed
			.setDescription(quoteEmbedDescription)
			.setColor(0xFF1199)
			.setTitle(`Quotes - Page ${pageNumber}/${quotesPages}`);

		// sends the embed
		return quoteEmbed;
	}
}

const actionBar = async (quotesPages, pageNumber) => {
	const quoteListMenu = new StringSelectMenuBuilder()
		.setCustomId("Page");

	for (let i = 1; i <= quotesPages; i++) {
		const quoteListMenuOption = new StringSelectMenuOptionBuilder()
			.setLabel(i.toString())
			.setValue(i.toString());
		
		if (pageNumber == i) quoteListMenuOption.setDefault(true);

		quoteListMenu.addOptions(quoteListMenuOption);
	}

	return quoteListMenu;
}

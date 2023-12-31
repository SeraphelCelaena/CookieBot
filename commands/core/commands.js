// imports
const fs = require('fs');
const {EmbedBuilder} = require('discord.js');

// exports commands command
module.exports = {
	name: 'commands',
	aliases: ['cmds', 'fullcmds'],
	permissions: [],
	help: '!commands',
	description: "Shows list of commands",
	async execute(client, message, commandName, arguments, Discord) {
		// variables
		const commandsFolder = fs.readdirSync('./commands');
		const commandsEmbed = new EmbedBuilder();

		// loops through the folders
		for (const folder of commandsFolder) {
			// more variables
			const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
			let commandsDescription = '';

			if (!commandFiles.length == 0 && (!commandFiles.includes('dummy.js') || commandName == 'fullcmds')) {
				// loops through the files
				for (const file of commandFiles) {
					if (file == 'dummy.js') continue; // skips dummy.js (if it exists)
					const command = require(`../${folder}/${file}`);
					commandsDescription += `- **${command.name}**: ${command.description}\n`;
				}

				// adds a field to the embed
				const tempFolderName = folder.split('-');
				let folderName = '';
				for (var word of tempFolderName)
				{
					folderName += `${word[0].toUpperCase() + word.toString().slice(1)} `;
				}
				if (commandsDescription == '') commandsDescription = 'No commands';
				commandsEmbed.addFields({name: folderName, value: commandsDescription, inline: true});
			}
		}

		// finishes making the embed
		commandsEmbed
			.setTitle('Commands')
			.setColor(0xFF1199);

		//sends the embed
		message.channel.send({embeds: [commandsEmbed]});
	}
}

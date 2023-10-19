const fs = require('fs');
const {EmbedBuilder} = require('discord.js');

module.exports = {
	name: 'commands',
	aliases: ['cmds'],
	permissions: [],
	description: "Shows list of commands",
	async execute(client, message, commandName, arguments, Discord) {
		const commandsFolder = fs.readdirSync('./commands');
		const commandsEmbed = new EmbedBuilder();
		
		for (const folder of commandsFolder) {
			const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
			let commandsDescription = '';

			for (const file of commandFiles) {
				const command = require(`../${folder}/${file}`);
				commandsDescription += `- **${command.name}**: ${command.description}\n`;
			}
			const folderName = folder[0].toUpperCase() + folder.toString().slice(1)
			commandsEmbed.addFields({name: folderName, value: commandsDescription, inline: true});
		}

		commandsEmbed
			.setTitle('Commands')
			.setColor(0xFF1199)

		message.channel.send({embeds: [commandsEmbed]});
	}
}

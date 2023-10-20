const fs = require('fs');

module.exports = (client, Discord) => {
	const commandsFolder = fs.readdirSync('./commands');

	for (const folder of commandsFolder) {
		const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));

		for (const file of commandFiles) {
			const command = require(`../commands/${folder}/${file}`);
			if (command.name) {
				client.commands.set(command.name, command);
			}
			else {
				console.log(`[WARNING] Command ${command} did not load correctly!`)
			}
		}
	}
}

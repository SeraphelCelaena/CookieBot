// imports
const fs = require('fs');

// exports command handler
module.exports = (client, Discord) => {
	const commandsFolder = fs.readdirSync('./commands');

	// loops through the folders
	for (const folder of commandsFolder) {
		const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));

		// loops through the files
		for (const file of commandFiles) {
			const command = require(`../commands/${folder}/${file}`);

			// sets the commands if it can, gives an error if not
			if (command.name) {
				client.commands.set(command.name, command);
			}
			else {
				console.log(`[WARNING] Command ${command} did not load correctly!`)
			}
		}
	}
}

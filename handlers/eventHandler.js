// imports
const fs = require('fs');

// exports eventHandler
module.exports = (client, Discord) => {
	const eventsFolder = fs.readdirSync(`./events`);

	// loops through the folders
	for (const folder of eventsFolder) {
		const eventFiles = fs.readdirSync(`./events/${folder}`).filter(file => file.endsWith('.js'));

		// loops through the files
		for (const file of eventFiles) {
			const event = require(`../events/${folder}/${file}`);
			const eventName = file.split('.')[0];
			client.on(eventName, event.bind(null, Discord, client));
		}
	}
}

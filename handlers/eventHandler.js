const fs = require('fs');

module.exports = (client, Discord) => {
	const eventsFolder = fs.readdirSync(`./events`);

	for (const folder of eventsFolder) {
		const eventFiles = fs.readdirSync(`./events/${folder}`).filter(file => file.endsWith('.js'));

		for (const file of eventFiles) {
			const event = require(`../events/${folder}/${file}`);
			const eventName = file.split('.')[0];
			client.on(eventName, event.bind(null, Discord, client));
		}
	}
}

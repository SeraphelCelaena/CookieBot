// "Imports" idk why import doesnt work
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const mongoose = require('mongoose');
require('dotenv').config();

// Creating the client Class
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages
	]
});

// --- Collections --- \\
client.commands = new Collection();
client.events = new Collection();

['commandHandler', 'eventHandler'].forEach(handler => {
	require(handler + '.js')(client, Discord);
})

// --- DISCORD LOGIN --- \\
client.login(process.env.DISCORD_TOKEN);

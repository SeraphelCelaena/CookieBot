// "Imports" idk why import doesnt work
const Discord = require('discord.js');
const mongoose = require('mongoose');
require('dotenv').config();

// Creating the client Class
const client = new Discord.Client({
	intents: [
		Discord.GatewayIntentBits.Guilds,
		Discord.GatewayIntentBits.GuildMessages
	]
});

// --- Collections --- \\
client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['eventHandler'].forEach(handler => {
	require(`./handlers/${handler}.js`)(client, Discord);
});

mongoose
	.connect(process.env.MONGODB_SRV)
	.then(() => {
		console.log("Connected to the database!");
	})
	.catch((error) => console.log(error));

// --- DISCORD LOGIN --- \\
client.login(process.env.DISCORD_TOKEN);

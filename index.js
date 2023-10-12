// "Imports" idk why import doesnt work
const fs = require('fs');
const Discord = require('discord.js');
const mongoose = require('mongoose');
require('dotenv').config();

// Creating the client Class
const client = new Discord.Client({
	intents: [
		Discord.GatewayIntentBits.Guilds,
		Discord.GatewayIntentBits.GuildMessages,
		Discord.GatewayIntentBits.MessageContent,
		Discord.GatewayIntentBits.GuildMembers
	]
});

// --- Collections --- \\
client.commands = new Discord.Collection();
client.events = new Discord.Collection();

// --- Handler --- \\
const handlerFiles = fs.readdirSync('./handlers').filter(file => file.endsWith('.js'));
for (const handler of handlerFiles) {
	require(`./handlers/${handler}`)(client, Discord);
}

// --- Mongoose --- \\
mongoose
	.connect(process.env.MONGODB_SRV)
	.then(() => {
		console.log("Connected to the database!");
	})
	.catch((error) => console.log(error));

// --- DISCORD LOGIN --- \\
client.login(process.env.DISCORD_TOKEN);

// imports
require('dotenv').config();

module.exports = async (Discord, client, message) => {
	const prefix = process.env.PREFIX;

	// if a bot sends then nothing
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const arguments = message.content.slice(prefix.length).split(/ +/);
	const commandName = arguments.shift().toLowerCase();

	// if a user just sends a ! then nothing
	if (commandName == null || commandName.trim() == "") return;
	if (commandName[0] == '!') return;

	// if the command does not exist then sends an error
	const command = client.commands.get(commandName) || client.commands.find(a => a.aliases && a.aliases.includes(commandName));
	if (!command) {
		return message.channel.send("This command does not exist!");
	}

	// tries to execute the command if can, but sends an error if cant
	try {
		command.execute(client, message, commandName, arguments, Discord);
	} catch (error) {
		message.reply("There was an error trying to execute this command!");
		console.log(error);
	}
}

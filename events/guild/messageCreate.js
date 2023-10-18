require('dotenv').config();

module.exports = async (Discord, client, message) => {
	const prefix = process.env.PREFIX;
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const arguments = message.content.slice(prefix.length).split(/ +/);
	const commandName = arguments.shift().toLowerCase();
	if (commandName == null || commandName.trim() == "") return;

	const command = client.commands.get(commandName) || client.commands.find(a => a.aliases && a.aliases.includes(commandName));
	if (!command) {
		return message.channel.send("This command does not exist!");
	}

	try {
		command.execute(client, message, commandName, arguments, Discord);
	} catch (error) {
		message.reply("There was an error trying to execute this command!");
		console.log(error);
	}
}

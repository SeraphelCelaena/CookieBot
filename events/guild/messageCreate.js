require('dotenv').config();

module.exports = async (Discord, client, message) => {
	const prefix = process.env.PREFIX;
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).split(/ +/);
	const cmd = args.shift().toLowerCase();

	const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));
	if (!command) {
		return message.channel.send("This command does not exist!");
	}

	try {
		command.execute(client, message, command, arguments, Discord);
	} catch (error) {
		message.reply("There was an error trying to execute this command!");
		console.log(error);
	}
}

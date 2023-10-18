module.exports = {
	name: 'deletequote',
	aliases: ['delquote'],
	permisssions: [],
	description: 'Deletes a quote',
	async execute(client, message, commandName, arguments, Discord) {
		console.log(arguments[0])
		console.log(parseInt(arguments[0]));
		console.log(Math.sign(arguments[0]) != 1)

		if (arguments.join(" ").trim() == "" || arguments == null) {
			message.channel.send("Specify a quote to delete!");
			return;
		} else if (Number.isInteger(parseInt(arguments[0])) && Math.sign(arguments[0]) != 1) {
			message.channel.send("Cannot delete 0/negative quotes!");
			return
		} else if (typeof arguments[0] == "string" && !Number.isInteger(parseInt(arguments[0]))) {
			message.channel.send("Don't send string")
		} else {
			message.channel.send(`Chomping Quote #${arguments[0]}`)
		}

		try {
			
		} catch(error) {
			console.log(`[Error] deletequote - ${error}`);
		}
	}
}
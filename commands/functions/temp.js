module.exports = {
	name: "temperature",
	aliases: ["temp"],
	permissions: [],
	help: "!temperature [TEMPERATURE] [C/F]",
	description: "Converts temperature from Celsius to Fahrenheit or vice versa",
	async execute(client, message, commandName, arguments, Discord) {
		if (arguments.join(" ").trim() == "" || arguments == null) {
			return message.channel.send("There is nothing to convert!");
		}
		else if (arguments.length < 2) {
			return message.channel.send("Please provide a temperature and a conversion type!");
		}
		else if (arguments.length > 2) {
			return message.channel.send("Too many arguments!");
		}

		let temp = arguments[0];
		let conversionType = arguments[1].toLowerCase();

		if (isNaN(temp)) {
			return message.channel.send("Please provide a valid number!");
		}
		if (conversionType != "c" && conversionType != "f") {
			return message.channel.send("Please provide a valid conversion type (C/F)!");
		}

		if (conversionType == "f") {
			let celsius = (temp - 32) * 5/9;
			return message.channel.send(`${temp}°F is ${celsius}°C`);
		}
		else if (conversionType == "c") {
			let fahrenheit = (temp * 9/5) + 32;
			return message.channel.send(`${temp}°C is ${fahrenheit}°F`);
		}
	}
}

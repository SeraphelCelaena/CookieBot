module.exports = {
	name: "temperature",
	aliases: ["temp"],
	permissions: [],
	help: "!temperature [Temperature][C/F]",
	example: "!temperature 32c",
	description: "Converts temperature from Celsius to Fahrenheit or vice versa",
	async execute(client, message, commandName, arguments, Discord) {
		if (arguments.join(" ").trim() == "" || arguments == null) {
			return message.channel.send("There is nothing to convert!");
		}
		else if (arguments.length > 1) {
			return message.channel.send("Too many arguments!");
		}

		let temp = arguments[0];
		let conversionType;
		if (temp[temp.length - 1] == "f" || temp[temp.length - 1] == "F" || temp[temp.length - 1] == "c" || temp[temp.length - 1] == "C") {
			conversionType = temp[temp.length - 1];
			temp = temp.slice(0, temp.length - 1);
		}

		if (isNaN(temp)) {
			return message.channel.send("Please provide a valid number!");
		}
		if (conversionType != "c" && conversionType != "f" && conversionType != "C" && conversionType != "F") {
			return message.channel.send("Please provide a valid conversion type (C/F)!");
		}

		if (conversionType == "f" || conversionType == "F") {
			let celsius = (temp - 32) * 5/9;
			return message.channel.send(`${temp}°F is ${celsius}°C`);
		}
		else if (conversionType == "c" || conversionType == "C") {
			let fahrenheit = (temp * 9/5) + 32;
			return message.channel.send(`${temp}°C is ${fahrenheit}°F`);
		}
	}
}

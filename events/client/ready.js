module.exports = (Discord, client) => {
	console.log(`Cookie Sez Mew\nLogged in as ${client.user.tag}`);
	client.user.setActivity('Eating Cheese', {type: Discord.ActivityType.Custom});
}

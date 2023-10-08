const {Events} = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`Cookie Sez Mew\nLoggen in as ${client.user.tag}`);
    }
};

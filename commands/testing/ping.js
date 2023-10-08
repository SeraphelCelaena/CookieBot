const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mew')
        .setDescription('Cookie sez mew!'),
    async execute(interaction) {
        await interaction.reply('MEW!');
    }
};


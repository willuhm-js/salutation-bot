import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from "discord.js";
export = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction: CommandInteraction) {
		return interaction.reply('Pong!');
	},
};

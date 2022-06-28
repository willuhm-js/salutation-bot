import fs from "node:fs";
import path from "node:path";
import { Client, Collection, Intents, Interaction, CommandInteraction } from "discord.js";
import { token } from "./config.js";;
import { SlashCommandBuilder } from '@discordjs/builders';


if (!token) throw new Error("No token provided!");

interface CommandData { 
	data: SlashCommandBuilder, 
	execute: (interaction: CommandInteraction) => any
}

class CustomClient<K extends string, V extends CommandData> extends Client {
	commands?: Collection<K, V>
}

const client = new CustomClient({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async (interaction: Interaction) => {
	if (!interaction.isCommand()) return;
	if (!client.commands) return;
	const command: any = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(token);
import fs from "node:fs";
import path from "node:path";
import { REST } from "@discordjs/rest";
import { Routes} from "discord-api-types/v9";
import { clientId, token } from "./config";

if (!token || !clientId) throw new Error("Missing token or clientId!");

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationCommands(clientId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);

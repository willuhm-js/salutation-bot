import fs from "node:fs";
import path from "node:path";
import { Client, Collection, Intents } from "discord.js";
import { token } from "./config.js";;

if (!token) throw new Error("No token provided!");

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });


client.once('ready', () => {
	console.log('Ready!');
});

export = () => client.login(token);
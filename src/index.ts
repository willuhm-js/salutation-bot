import bot from "./discord.js";
import express from "express";

const app = express();

app.get("/", (req, res) => res.send("Hello, world!"));

app.listen(8080, () => bot());
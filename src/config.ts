import { config } from "dotenv";
config();

const clientId = process.env.CLIENTID;
const token = process.env.BOTTOKEN;

export {clientId, token};

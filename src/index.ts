import * as dotenv from "dotenv";
import { connectToDatabase } from "./data/services/database.service";
import GetViewers from "./commands/getCommand"
import RegisterViewer from "./commands/registerCommand"

console.log('starting app');
const tmi = require('tmi.js');

// const client = new tmi.Client({
//     channels: ['madnecat']
// });

const client = new tmi.Client({
	options: { debug: true },
	identity: {
		username: 'madnecatbot',
		password: process.env.TWITCH_TOKEN
	},
	channels: [ 'madnecat' ]
});

client.connect();
connectToDatabase().then(async () => {
    client.on('message', async (channel: string, tags: any, message: string, self: any) => {
        console.log(`${tags['display-name']}: ${message}`);
        if (message.startsWith('!')) {
            await CommandManagement(message, tags);
        }
    });
    console.log('app started successfully');
});

async function CommandManagement(message: string, tags: any) {
    console.log('commands management');
    if (message.startsWith('!get')) {
        await GetViewers();
    }
    if (message.startsWith('!register')) {
        await RegisterViewer(tags['display-name']);
    }
}
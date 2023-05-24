import * as dotenv from "dotenv";
import { connectToDatabase } from "./data/services/database.service"; 
import GetViewers from "./commands/getCommand"
import RegisterViewer from "./commands/registerCommand"
import { Analytics } from '@vercel/analytics/react';

console.log('starting app');
dotenv.config();
const tmi = require('tmi.js');

try {
    SetUpTwitchListener();
} catch (error) {
    console.log(`app crashed ${error}`);
}

async function SetUpTwitchListener() {
    console.log(`listening to port ${process.env.PORT || 443}`);
    const client = new tmi.Client({
        options: { debug: true },
        identity: {
            username: 'madnecatbot',
            password: `oauth:${process.env.TWITCH_OAUTH_TOKEN}`
        },
        connection: {port: process.env.PORT || 443},
        channels: ['madnecat']
    });
    client.connect();
    connectToDatabase().then(async () => {
        client.on('message', async (channel: string, tags: any, message: string, self: any) => {
            console.log(`${tags['display-name']}: ${message}`);
            if (message.startsWith('!')) {
                await CommandManagement(message, tags, client, channel);
            }
        });
        console.log('app started successfully');
    });
}

async function CommandManagement(message: string, tags: any, client: any, channel: string) {
    console.log('commands management');
    if (message.startsWith('!get')) {
        await GetViewers();
    }
    if (message.startsWith('!register')) {
        await RegisterViewer(tags['display-name']);
    }
    if (message.startsWith('!hello')) {
        client.say(channel, `@${tags.username}, heya!`);
    }
}
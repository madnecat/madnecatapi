import * as dotenv from "dotenv";
import { connectToDatabase } from "./data/services/database.service";
import RegisterViewer from "./commands/registerCommand"
import GetXp from "./commands/getXpCommand"
import IncrementMessageCounter from "./commands/incrementMessageCounterCommand"

console.log('starting app');
dotenv.config();
const tmi = require('tmi.js');
const _botName = 'madnecatbot';

try {
    SetUpTwitchListener();
} catch (error) {
    console.log(`app crashed ${error}`);
}

async function SetUpTwitchListener() {
    const client = new tmi.Client({
        options: { debug: true },
        identity: {
            username: 'madnecatbot',
            password: `oauth:${process.env.TWITCH_OAUTH_TOKEN}`
        },
        connection: { 
            reconnect: true,
            secure: true
        },
        channels: ['madnecat']
    });
    client.connect().then(() => {
        console.info("Connected to Chat")
    })
    .catch((e:any) => {
        console.error(`Failed to connect to Twitch Chat: ${e}`);
    });
    client.on('message', async (channel: string, tags: any, message: string, self: any) => {
        if(tags['display-name'] == _botName) {
            return;
        }
        console.log(`${tags['display-name']}: ${message}`);
        await connectToDatabase();
        await MessageManagement(message, tags, client, channel);
        if (message.startsWith('!')) {
            await CommandManagement(message, tags, client, channel);
        }
    });
}

async function CommandManagement(message: string, tags: any, client: any, channel: string) {
    console.log('commands management');
    if (message.startsWith('!hello')) {
        client.say(channel, `@${tags['display-name']}, heya! HeyGuys`);
    }
    if (message.startsWith('!xp')) {
        var xp = await GetXp(tags['display-name']);
        client.say(channel, `@${tags['display-name']}, tu as ${xp}xp Kreygasm`);
    }
}

async function MessageManagement(message: string, tags: any, client: any, channel: string) {
    console.log('message management management');
    await RegisterViewer(tags['display-name']);
    await IncrementMessageCounter(tags['display-name']);
}

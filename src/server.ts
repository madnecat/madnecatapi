import * as dotenv from "dotenv";
import { connectToDatabase } from "./data/services/database.service";
import registerViewer from "./commands/registerCommand"
import getXp from "./commands/getXpCommand"
import incrementMessageCounter from "./commands/incrementMessageCounterCommand"
import manageLevels from "./commands/levelManagement";

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
        await messageManagement(message, tags, client, channel);
        if (message.startsWith('!')) {
            await commandManagement(message, tags, client, channel);
        }
    });
}

async function commandManagement(message: string, tags: any, client: any, channel: string) {
    if (message.startsWith('!hello')) {
        client.say(channel, `@${tags['display-name']}, heya! HeyGuys`);
    }
    if (message.startsWith('!xp')) {
        await getXp(tags['display-name'], client, channel);
    }
}

async function messageManagement(message: string, tags: any, client: any, channel: string) {
    await registerViewer(tags['display-name']);
    await incrementMessageCounter(tags['display-name']);
    await manageLevels(tags['display-name'], client, channel);
}

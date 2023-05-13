import { connectToDatabase } from "./data/services/database.service";
import GetViewers from "./commands/getCommand"

console.log('starting app');
const tmi = require('tmi.js');

const client = new tmi.Client({
    channels: ['madnecat']
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
}
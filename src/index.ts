import { ObjectId } from "mongodb";
import { collections, connectToDatabase } from "./data/services/database.service";
import Viewer from "./data/models/viewer";

console.log('starting app');
const tmi = require('tmi.js');

const client = new tmi.Client({
    channels: ['madnecat']
});

client.connect();

client.on('message', async (channel: string, tags: any, message: string, self: any) => {
    console.log(`${tags['display-name']}: ${message}`);
    if (message.startsWith('!')) {
        await CommandManagement(message, tags);
    }
});

async function CommandManagement(message: string, tags: any) {
    console.log('commands management');
    if (message.startsWith('!get')) {
        await GetViewers();
    }
}

async function GetViewers() {
    console.log('get');
    try {
        connectToDatabase().then(async () => {
            const viewers = (await collections.Viewers?.find().toArray()) as Viewer[];
            viewers.forEach(viewer => {
                console.log(`username: ${viewer.UserName} and id: ${viewer._id}`)
            });
        });
    } catch (error) {
        console.log(`error in get ${error}`);
    }
}
import { Level } from "../data/models/level";
import {Viewer} from "../data/models/viewer";
import { ViewerLevel } from "../data/models/viewerLevel";

export default async function getXp(twitchId: number, userName:string, client: any, channel: string){
    try {
        ViewerLevel;
        var viewer = await Viewer.findOne().where('twitchId').equals(twitchId).populate({
            path: 'viewerLevels',
            populate: {
                path: 'level'
            }
        });
        var currentLevels = <number[]><unknown>viewer?.viewerLevels.map(x => x.level.level);
        var currentMaxLevel = (currentLevels == undefined || currentLevels.length == 0) ? 
            0 :
            Math.max.apply(null, currentLevels);
        var message = `@${userName}, tu as ${viewer?.nbMessages}xp, tu es niveau ${currentMaxLevel}. `;
        var nextLevels = await Level.find({level:{ "$nin": currentLevels}, class: null}).sort('level');

        if(nextLevels == undefined || 
            nextLevels.length == 0){
                message += 'Tu es niveau max! Kreygasm';
        } else {
            var xpToNextLevel = nextLevels[0].requiredXp - <number>viewer?.nbMessages;
            message += `Plus que ${xpToNextLevel} avant d'atteindre le niveau ${nextLevels[0].level} KomodoHype`;
        }
        client.say(channel, message);
    } catch (error) {
        console.log(`error in get xp ${error}`);
    }
}
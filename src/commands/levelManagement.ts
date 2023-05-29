import {Viewer} from "../data/models/viewer";
import {Level} from "../data/models/level";
import { ViewerLevel } from "../data/models/viewerLevel";

export default async function manageLevels(userName:string, client: any, channel: string){
    try {
        ViewerLevel;
        var viewer = await Viewer.findOne().where('userName').equals(userName).populate({
            path: 'viewerLevels',
            populate: {
                path: 'level'
            }
        });
        var currentLevels = <number[]><unknown>viewer?.viewerLevels.map(x => x.level.level);
        var nextLevels = await Level.find().where('level').nin(currentLevels).sort('level');
        if(nextLevels == undefined || 
            nextLevels.length == 0 ||
            nextLevels[0].requiredXp > <number>viewer?.nbMessages){
                return;
        }
        var newLevel = new ViewerLevel({
            viewer: viewer,
            level: nextLevels[0],
            dateCreated: new Date()
        });
        newLevel.save();
        client.say(channel, `Bravo @${userName}! Tu viens de passer niveau ${nextLevels[0].level}! SeemsGood`);
    } catch (error) {
        console.log(`error in levelManagement ${error}`);
    }
}
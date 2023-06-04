import { Class } from "../data/models/class";
import { Level } from "../data/models/level";
import {Viewer} from "../data/models/viewer";
import { ViewerClass } from "../data/models/viewerClass";
import { ViewerClassLevel } from "../data/models/viewerClassLevel";

export default async function getClassXp(twitchId: number, userName:string, client: any, channel: string){
    try {
        var viewer = await Viewer.findOne().where('twitchId').equals(twitchId).populate({
            path: 'viewerClasses',
            populate: {
                path: 'viewerClassLevels', 
                populate: {
                    path: 'level'
                }
            }
        });
        var currentViewerClass = viewer?.viewerClasses.filter(x => x.dateDeleted == null)[0];
        if(currentViewerClass == undefined) {
            throw new Error("The viewer doesn't have a class");
        }
        var currentClass = await Class.findOne().where('_id').equals(currentViewerClass.class);
        var currentLevels = <number[]><unknown>currentViewerClass.viewerClassLevels.map(x => x.level.level);
        var currentMaxLevel = (currentLevels == undefined || currentLevels.length == 0) ? 
            0 :
            Math.max.apply(null, currentLevels);
        var message = `@${userName}, tu es ${currentClass?.name} niveau ${currentMaxLevel}. Tu as ${currentViewerClass.xp}xp. `;
        var nextLevels = await Level.find({level:{ "$nin": currentLevels}, class: currentViewerClass.class._id}).sort('level');

        if(nextLevels == undefined || 
            nextLevels.length == 0){
                message += 'Tu es niveau max! Kreygasm';
        } else {
            var xpToNextLevel = nextLevels[0].requiredXp - <number>currentViewerClass.xp;
            message += `Plus que ${xpToNextLevel} avant d'atteindre le niveau ${nextLevels[0].level} KomodoHype`;
        }
        client.say(channel, message);
    } catch (error) {
        console.log(`error in get xp ${error}`);
    }
}
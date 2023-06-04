import {Viewer} from "../data/models/viewer";
import {Level} from "../data/models/level";
import { ViewerClass } from "../data/models/viewerClass";
import { ViewerClassLevel } from "../data/models/viewerClassLevel";

export default async function manageClassLevels(twitchId: number, userName: string, client: any, channel: string){
    try {
        ViewerClassLevel;
        var viewer = await Viewer.findOne().where('twitchId').equals(twitchId);
        if(viewer == null) {
            throw new Error(`Couldn't find user ${twitchId}`);
        }
        var currentViewerClass = await ViewerClass.findOne()
            .where('viewer').equals(viewer._id)
            .where('dateDeleted').equals(null)
            .populate({
                path: 'viewerClassLevels',
                populate: {
                    path: 'level'
                }
            }).populate('class');
        if(currentViewerClass == null) {
            throw new Error(`Couldn't find a class for user ${twitchId}`);
        }
        var currentLevels = <number[]><unknown>currentViewerClass.viewerClassLevels.map(x => x.level.level);
        var nextLevels = await Level.find({level:{ "$nin": currentLevels}, class: currentViewerClass.class._id}).sort('level');
        if(nextLevels == undefined || 
            nextLevels.length == 0 ||
            nextLevels[0].requiredXp > <number>currentViewerClass.xp){
                return;
        }
        var newLevel = new ViewerClassLevel({
            viewerClass: currentViewerClass._id,
            level: nextLevels[0],
            dateCreated: new Date()
        });
        newLevel.save();
        client.say(channel, `Bravo @${userName}! Tu viens de passer ${currentViewerClass.class.name} niveau ${nextLevels[0].level}! SeemsGood`);
    } catch (error) {
        console.log(`error in levelManagement ${error}`);
    }
}
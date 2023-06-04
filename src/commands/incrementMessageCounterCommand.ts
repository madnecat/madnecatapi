import {Viewer} from "../data/models/viewer";
import { ViewerClass } from "../data/models/viewerClass";

export default async function incrementMessageCounter(twitchId: number) {
    try {
        var viewer = await Viewer.findOne().where('twitchId').equals(twitchId);
        if (viewer == null) {
            throw new Error(`couldn't find user ${twitchId}`);
        }
        viewer.nbMessages = (viewer?.nbMessages ?? 0) + 1
        await viewer.save();

        var viewerClass = await ViewerClass.findOne({viewer:viewer._id, dateDeleted: null});
        if(viewerClass == null) {
            throw new Error("The viewer doesn't have a class");
        }
        viewerClass.xp = (viewerClass.xp ?? 0) + 1;
        await viewerClass.save();
    } catch (error) {
        console.log(`error in IncrementMessageCounter ${error}`);
    }
}
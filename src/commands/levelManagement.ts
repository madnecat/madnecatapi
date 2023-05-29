import {Viewer} from "../data/models/viewer";
import {Level} from "../data/models/level";
import {ViewerLevel} from "../data/models/viewerlevel";

export default async function IncrementMessageCounter(userName:string) {
    try {
        var viewer = await Viewer.findOne().where('userName').equals(userName);
        var viewerLevels = await ViewerLevel.find().where('viewerId').equals(viewer?._id);
        var lastViewerLevel: ViewerLevel  = null;
    } catch (error) {
        console.log(`error in IncrementMessageCounter ${error}`);
    }
}
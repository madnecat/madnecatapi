import { ObjectId } from "mongodb";
import {IViewer, Viewer} from "../data/models/viewer";
import ClassName from "../data/models/enums/ClassName";
import { ViewerClass } from "../data/models/viewerClass";
import { Class } from "../data/models/class";

export default async function registerViewer(twitchId: number, userName:string) {
    try {
        var viewer = await manageViewer();
        if(viewer.viewerClasses == null || viewer.viewerClasses.length == 0){
            var classId: number = Math.floor(Math.random() * Object.keys(ClassName).length);
            var className = ClassName[classId];
            var classObject = await Class.findOne().where('name').equals(className);
            var viewerClass = new ViewerClass({
                viewer: viewer,
                dateCreated: new Date(),
                xp: 0, 
                class: classObject
            });
            await viewerClass.save();
        }
        console.log(`user registered`);
    } catch (error) {
        console.log(`error in register ${error}`);
    }

    async function manageViewer(): Promise<IViewer>{
        ViewerClass;
        var viewer = await Viewer.findOne().where('userName').equals(userName).populate('viewerClasses');
        //var viewer = await Viewer.findOne().where('twitchId').equals(twitchId).populate('viewerClasses');
        if (viewer != null) {
            viewer.upgrade(twitchId);
        } else {
            viewer = new Viewer({
                _id: new ObjectId(),
                userName: userName,
                dateCreated: new Date(),
                nbMessages: 0,
                twitchId: twitchId
            });
        }
        await viewer.save();
        return viewer;
    }
}
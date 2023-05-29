import {Viewer} from "../data/models/viewer";

export default async function RegisterViewer(userName:string) {
    try {
        var viewer = await Viewer.findOne().where('userName').equals(userName);
        if(viewer != null) {
            viewer.upgrade();
            viewer.updateOne(
                {'userName':`${userName}`}, 
                {$set: {"nbMessages": viewer.nbMessages, "dateCreated": viewer.dateCreated}}
            );
            return;
        }
        viewer = new Viewer({
            userName: userName, 
            dateCreated: new Date(),
            nbMessages: 0
        });
        await viewer.save();
        console.log(`user registered`);
    } catch (error) {
        console.log(`error in register ${error}`);
    }
}
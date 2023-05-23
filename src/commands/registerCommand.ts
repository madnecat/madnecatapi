import { collections } from "../data/services/database.service";
import {Viewer} from "../data/models/viewer";


export default async function RegisterViewer(userName:string) {
    console.log(`register ${userName}`);
    try {
        var viewer = (await collections.Viewers?.findOne({'userName':`${userName}`})) as Viewer;
        if(viewer != null) {
            upgrade(viewer);
            collections.Viewers?.updateOne(
                {'userName':`${userName}`}, 
                {$set: {"nbMessages": viewer.nbMessages, "dateCreated": viewer.dateCreated}}
            );
            console.log(`${userName} already exists, skipping creation`);
            return;
        }
        viewer = new Viewer(userName, undefined);
        await collections.Viewers?.insertOne(viewer);
        console.log(`user registered`);
    } catch (error) {
        console.log(`error in register ${error}`);
    }
}

function upgrade(viewer: Viewer){
    if(viewer.nbMessages == undefined){
        viewer.nbMessages = 0;
    }
    if(viewer.dateCreated == undefined){
        viewer.dateCreated = new Date()
    }
}
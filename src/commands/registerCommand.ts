import { collections } from "../data/services/database.service";
import Viewer from "../data/models/viewer";

export default async function RegisterViewer(userName:string) {
    console.log(`register ${userName}`);
    try {
        var viewer = (await collections.Viewers?.findOne({'UserName':`${userName}`})) as Viewer;
        if(viewer != null) {
            console.log(`${userName} already exists, skipping creation`);
            return;
        }
        viewer = new Viewer(userName, undefined);
        await collections.Viewers?.insertOne(viewer);
        console.log(`user registered`);
    } catch (error) {
        console.log(`error in get ${error}`);
    }
}
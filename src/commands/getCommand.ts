import { collections } from "../data/services/database.service";
import Viewer from "../data/models/viewer";

export default async function GetViewers() {
    console.log('get');
    try {
        const viewers = (await collections.Viewers?.find().toArray()) as Viewer[];
        viewers.forEach(viewer => {
            console.log(`username: ${viewer.UserName} and id: ${viewer._id}`)
        });
    } catch (error) {
        console.log(`error in get ${error}`);
    }
}
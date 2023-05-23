import { collections } from "../data/services/database.service";
import {Viewer} from "../data/models/viewer";

export default async function GetXp(userName:string): Promise<number | undefined> {
    console.log(`get xp ${userName}`);
    try {
        var viewer = (await collections.Viewers?.findOne({'userName':`${userName}`})) as Viewer;
        console.log(`get xp for user ${userName}, value: ${viewer.nbMessages}`);
        return viewer.nbMessages;
    } catch (error) {
        console.log(`error in get xp ${error}`);
    }
}
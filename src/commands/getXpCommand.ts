import {Viewer} from "../data/models/viewer";

export default async function GetXp(userName:string): Promise<number | undefined> {
    try {
        var viewer = await Viewer.findOne().where('userName').equals(userName);
        if(viewer == null) {
            throw new Error(`Error: cannot find user ${userName}`);
        }
        return viewer.nbMessages;
    } catch (error) {
        console.log(`error in get xp ${error}`);
    }
}
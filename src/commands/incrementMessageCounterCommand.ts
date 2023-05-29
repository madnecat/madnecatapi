import {Viewer} from "../data/models/viewer";

export default async function IncrementMessageCounter(userName:string) {
    try {
        await Viewer.updateOne({'userName':`${userName}`}, {$inc: {"nbMessages": 1}});
    } catch (error) {
        console.log(`error in IncrementMessageCounter ${error}`);
    }
}
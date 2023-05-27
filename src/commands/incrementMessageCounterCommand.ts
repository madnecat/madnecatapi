import { collections } from "../data/services/database.service";

export default async function IncrementMessageCounter(userName:string) {
    console.log(`increment messages counter for user ${userName}`);
    try {
        await collections.Viewers?.updateOne({'userName':`${userName}`}, {$inc: {"nbMessages": 1}});
    } catch (error) {
        console.log(`error in IncrementMessageCounter ${error}`);
    }
}
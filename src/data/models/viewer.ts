import { ObjectId } from "mongodb";

export default class Viewer{
    constructor(public userName: string,
        public _id: ObjectId | undefined) {
        if(_id == undefined){
            this._id = new ObjectId();
        } else {
            this._id = _id;
        }
        
    }
}


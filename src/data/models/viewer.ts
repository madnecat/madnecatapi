import { ObjectId } from "mongodb";

export class Viewer{
    public nbMessages: number;
    public dateCreated: Date;
    constructor(public userName: string,
        public _id: ObjectId | undefined) {
        if(_id == undefined){
            this._id = new ObjectId();
        } else {
            this._id = _id;
        }
        this.nbMessages = 0;
        this.dateCreated = new Date()
    }
}

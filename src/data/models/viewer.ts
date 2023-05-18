import { ObjectId } from "mongodb";
import IDataModel from "./IDataModel";

export default class Viewer implements IDataModel {
    UserName: string;
    _id: ObjectId;
    constructor(public userName: string,
        public id: ObjectId | undefined) {
        this.UserName = userName;
        if(id == undefined){
            this._id = new ObjectId();
        } else {
            this._id = id;
        }
        
    }
}


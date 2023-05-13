import { ObjectId } from "mongodb";
import IDataModel from "./IDataModel";

export default class Viewer implements IDataModel{
    UserName: string;
    _id: ObjectId;
    constructor(public userName: string, 
        public id: ObjectId) {
            this.UserName = userName;
            this._id = id;
        }
}


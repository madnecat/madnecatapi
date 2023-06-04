import { Schema, Model, model } from "mongoose"
import { ILevel } from "./level";
import { IViewerClass } from "./viewerClass";

export interface IViewerClassLevel {
    viewerClass: IViewerClass;
    level: ILevel;
    dateCreated: Date
}

//schema
const viewerClassLevelSchema = new Schema<IViewerClassLevel, ViewerClassLevelModel, IViewerClassLevelMethods>({
    viewerClass: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'viewerclasses'
    },
    level: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'levels'
    },
    dateCreated: {
        type: Date,
        required: true
    }
});

interface IViewerClassLevelMethods {
}

type ViewerClassLevelModel = Model<IViewerClassLevel, {}, IViewerClassLevelMethods>;


export const ViewerClassLevel = model<IViewerClassLevel, ViewerClassLevelModel>('viewerclasslevels', viewerClassLevelSchema);

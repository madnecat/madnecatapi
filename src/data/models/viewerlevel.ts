import { Schema, Model, model } from "mongoose"
import { ILevel } from "./level";
import { IViewer } from "./viewer";

export interface IViewerLevel {
    viewer: IViewer;
    level: ILevel;
    dateCreated: Date
}

//schema
const ViewerLevelSchema = new Schema<IViewerLevel, ViewerLevelModel, IViewerLevelMethods>({
    viewer: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'viewers'
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

interface IViewerLevelMethods {
}

type ViewerLevelModel = Model<IViewerLevel, {}, IViewerLevelMethods>;


export const ViewerLevel = model<IViewerLevel, ViewerLevelModel>('viewerlevels', ViewerLevelSchema);
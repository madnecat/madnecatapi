import { ObjectId } from "mongodb";
import { Schema, Model, model } from "mongoose"

interface IViewerLevel {
    viewerId: ObjectId;
    levelId: ObjectId;
    dateCreated: Date
}

//schema
const ViewerLevelSchema = new Schema<IViewerLevel, ViewerLevelModel, IViewerLevelMethods>({
    viewerId: {
        type: ObjectId,
        required: true
    },
    levelId: {
        type: ObjectId,
        required: true
    },
    dateCreated: {
        type: Date,
        required: true
    }
});

interface IViewerLevelMethods {
}

type ViewerLevelModel = Model<IViewerLevel, {}, IViewerLevelMethods>;


export const ViewerLevel = model<IViewerLevel, ViewerLevelModel>('viewerLevels', ViewerLevelSchema);
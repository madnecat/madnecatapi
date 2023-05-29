import { Schema, Model, model } from "mongoose"
import { IViewerLevel } from "./viewerLevel";

export interface IViewer {
    _id: Schema.Types.ObjectId;
    nbMessages?: number;
    dateCreated?: Date;
    userName: string;
    viewerLevels: IViewerLevel[];
}

//schema
const viewerSchema = new Schema<IViewer, ViewerModel, IViewerMethods>({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    nbMessages: {
        type: Number,
        required: false,
    },
    dateCreated: {
        type: Date,
        required: false
    }
});

viewerSchema.virtual('viewerLevels', {
    ref: 'viewerlevels',
    localField: '_id',
    foreignField: 'viewer'
});

interface IViewerMethods {
    upgrade(): string;
}

type ViewerModel = Model<IViewer, {}, IViewerMethods>;

viewerSchema.method('upgrade', function upgrade() {
    if (this.nbMessages == undefined) {
        this.nbMessages = 0;
    }
    if (this.dateCreated == undefined) {
        this.dateCreated = new Date()
    }
})

export const Viewer = model<IViewer, ViewerModel>('viewers', viewerSchema);
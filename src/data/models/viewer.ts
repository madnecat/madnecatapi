import { Schema, Model, model } from "mongoose"
import { IViewerLevel } from "./viewerLevel";
import { IViewerClass } from "./viewerClass";

export interface IViewer {
    _id: Schema.Types.ObjectId;
    nbMessages?: number;
    dateCreated?: Date;
    userName: string;
    viewerLevels: IViewerLevel[];
    twitchId: number;
    viewerClasses: IViewerClass[];
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
    },
    twitchId: {
        type: Number,
        required: true
    }
});

viewerSchema.virtual('viewerLevels', {
    ref: 'viewerlevels',
    localField: '_id',
    foreignField: 'viewer'
});
viewerSchema.virtual('viewerClasses', {
    ref: 'viewerclasses',
    localField: '_id',
    foreignField: 'viewer'
});

interface IViewerMethods {
    upgrade(twitchId:number): string;
}

type ViewerModel = Model<IViewer, {}, IViewerMethods>;

viewerSchema.method('upgrade', function upgrade(twitchId:number) {
    if(this.twitchId == 0) {
        this.twitchId = twitchId
    }
    if(this.viewerClasses == null) {

    }
})

export const Viewer = model<IViewer, ViewerModel>('viewers', viewerSchema);
import { Schema, Model, model } from "mongoose"
import { IClass } from "./class";
import { IViewer } from "./viewer";
import { IViewerClassLevel } from "./viewerClassLevel";

export interface IViewerClass {
    _id: Schema.Types.ObjectId;
    viewer: IViewer;
    class: IClass;
    dateCreated: Date;
    dateDeleted?: Date;
    xp: number;
    viewerClassLevels: IViewerClassLevel[];
}

//schema
const viewerClassSchema = new Schema<IViewerClass, ViewerClassModel, IViewerClassMethods>({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    viewer: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'viewers'
    },
    class: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'classes'
    },
    dateCreated: {
        type: Date,
        required: true
    },
    dateDeleted: {
        type: Date,
        required: false
    }
    ,
    xp: {
        type: Number,
        required: true
    }
});

viewerClassSchema.virtual('viewerClassLevels', {
    ref: 'viewerclasslevels',
    localField: '_id',
    foreignField: 'viewerClass'
});

interface IViewerClassMethods {
}

type ViewerClassModel = Model<IViewerClass, {}, IViewerClassMethods>;


export const ViewerClass = model<IViewerClass, ViewerClassModel>('viewerclasses', viewerClassSchema);

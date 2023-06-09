import { Schema, Model, model } from "mongoose"
import { IViewerLevel } from "./viewerLevel";
import { IClass } from "./class";

export interface ILevel {
    _id: Schema.Types.ObjectId;
    requiredXp: number;
    level: number;
    viewerLevels: IViewerLevel[];
    class?: IClass
}

//schema
const levelSchema = new Schema<ILevel, LevelModel, ILevelMethods>({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    requiredXp: {
        type: Number,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    class: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'classes'
    },
});

levelSchema.virtual('viewerLevels', {
    ref: 'viewerlevels',
    localField: '_id',
    foreignField: 'level'
});

interface ILevelMethods {
}

type LevelModel = Model<ILevel, {}, ILevelMethods>;


export const Level = model<ILevel, LevelModel>('levels', levelSchema);
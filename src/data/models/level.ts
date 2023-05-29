import { ObjectId } from "mongodb";
import { Schema, Model, model } from "mongoose"

interface ILevel {
    _id: ObjectId;
    requiredXp: number;
    level: number;
}

//schema
const levelSchema = new Schema<ILevel, LevelModel, ILevelMethods>({
    _id: {
        type: ObjectId,
        required: true
    },
    requiredXp: {
        type: Number,
        required: true
    },
    level: {
        type: Number,
        required: true
    }
});

interface ILevelMethods {
}

type LevelModel = Model<ILevel, {}, ILevelMethods>;


export const Level = model<ILevel, LevelModel>('levels', levelSchema);
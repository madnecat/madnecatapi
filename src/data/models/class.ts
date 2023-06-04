import { Schema, Model, model } from "mongoose"

export interface IClass {
    _id: Schema.Types.ObjectId;
    name: string;
}

//schema
const classSchema = new Schema<IClass, ClassModel, IClassMethods>({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

interface IClassMethods {
}

type ClassModel = Model<IClass, {}, IClassMethods>;


export const Class = model<IClass, ClassModel>('classes', classSchema);
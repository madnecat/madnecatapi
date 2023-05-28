import { Schema, Model, model } from "mongoose"

interface IViewer {
    nbMessages?: number;
    dateCreated?: Date;
    userName: string;
}

//schema
const viewerSchema = new Schema<IViewer, ViewerModel, IViewerMethods>({
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

interface IViewerMethods {
    upgrade(): string;
  }

type ViewerModel = Model<IViewer, {}, IViewerMethods>;

viewerSchema.method('upgrade', function upgrade(){
    if(this.nbMessages == undefined){
        this.nbMessages = 0;
    }
    if(this.dateCreated == undefined){
        this.dateCreated = new Date()
    }
})

export const Viewer = model<IViewer, ViewerModel>('Viewers', viewerSchema);
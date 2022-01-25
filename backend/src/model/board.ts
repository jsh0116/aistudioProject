import mongoose, { Document, Schema, model } from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

export interface Board {
    num?: number;
    userId?: string,
    title: string,
    file: string,
    date?: Date,
    count?: number,
    textScript?: string[];
    slideImageInfo?: object;
}

const slideImageInfo = new Schema({
    fileExt: { type: String, required: true },
    fileId: { type: String, required: true },
    fileName: { type: String, required: false },
    fileSize: { type: Number, required: true },
    Url: { type: String, required: true },
})

const schema = new Schema({
    num: { type: Number, required: true, unique: true, index: true },
    userId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    file: { type: String, required: false },
    date: { type: Date, required: true },
    count: { type: Number, required: true },
    textScript: { type: [String], required: true },
    slideImageInfo: { type: Object, default: undefined }
})

autoIncrement.initialize(mongoose.connection);
schema.plugin(autoIncrement.plugin, {
    model: 'Board',
    field: 'num',
    startAt: 1, //시작.
    increment: 1, //증가.
})

export const BoardModel = model<Board & Document>('Board', schema);
// import mongoose from 'mongoose';
import mongoose, { Schema , Document , Model } from "mongoose";

 export interface ITask extends Document {
    task: string;
    priority: number;
    status: number;
    archived: boolean;
    createdBy: mongoose.Types.ObjectId;
    updatedBy?: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
  }
  

const TaskSchema:Schema = new Schema({
    task: {
        type: String,
        required: true,
    },
    priority: {
        type: Number,
        enum: [1, 2, 3], // 1 = High, 2 = Medium, 3 = Low
        default: 3,
    },
    status: {
        type: Number,
        enum: [1, 2], // 1 = Ongoing, 2 = Done
        default: 1,
    },
    archived: {
        type: Boolean,
        default: false,
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", // Reference to the User model
        required: true,
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", // Reference to the User model
      },
}, { timestamps: true }); // Automatically adds `createdAt` and `updatedAt`);

export const TaskPriority = {
    HIGH: 1,
    MEDIUM: 2,
    LOW: 3,
};

export const TaskStatus = {
    ONGOING: 1,
    DONE: 2,
};

export const Task:Model<ITask> = mongoose.model<ITask>("Task", TaskSchema);
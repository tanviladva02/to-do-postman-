import mongoose, { Schema , Document,model , Model } from "mongoose";

export interface IUser extends Document {
    username: string;
    email: string;
    pass: string;
    createdAt?: Date;
    updatedAt?: Date;
  }

const userSchema:Schema = new Schema<IUser>({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    pass:{
        type:String,
        require:true
    }
},{timestamps:true});

export const userModel:Model<IUser> = mongoose.model<IUser>("user", userSchema);

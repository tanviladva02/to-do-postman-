import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    pass: {
        type: String,
        require: true
    }
}, { timestamps: true });
export const userModel = mongoose.model("user", userSchema);

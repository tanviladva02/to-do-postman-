import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect("mongodb+srv://tanviladva01:tanvi123@to-do.m6aes.mongodb.net/to-do");
        console.log("Connected to MongoDB Atlas!");
    } catch (err) {
        console.error("Error connecting to MongoDB Atlas:", err);
        process.exit(1);
    }
};

export default connectDB;
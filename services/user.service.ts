import {userModel} from "../model/model.user.js";
import * as bcrypt from "bcrypt";  
import { ObjectId } from "mongoose";
import { IUser } from "../model/model.user.js";

interface UserData {
  username?: string;
  email?: string;
  pass?: string;
}

// Function to hash the password
export async function hashPassword(plainPassword:string):Promise<string> {
    try {
      const saltRounds = 10; // Number of salt rounds
      const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
      return hashedPassword;
    } catch (err:any) {
      console.error("Error hashing password:", err);
      throw err;
    }
  }
  

export  async function addUser(username:string, email:string, plainPassword:string):Promise<IUser> {
    try {
      const hashedPassword = await hashPassword(plainPassword); // Hash the password
      const newUser = new userModel({
        username,
        email,
        pass: hashedPassword, // Store the hashed password
      });
      await newUser.save();
      return newUser;
    } catch (err:any) {
      throw new Error(`User creation failed: ${err.message}`);
    }
  }

export async function viewUser():Promise<IUser[]> {
  try {
    const users = await userModel.find(); // Fetch all users
    return users;
  } catch (err:any) {
    throw new Error(`User fetch failed: ${err.message}`);
  }
}

export async function updateUser(userId:string | ObjectId, userData:UserData):Promise<IUser| null> {
    try {
      const updatedUser = await userModel.findByIdAndUpdate(
        userId,
        { $set: userData }, // Update only provided fields
        { new: true } // Return the updated document
      );
      return updatedUser;
    } catch (err:any) {
      throw new Error(`User update failed: ${err.message}`);
    }
}



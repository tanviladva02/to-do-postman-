var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { userModel } from "../model/model.user.js";
import * as bcrypt from "bcrypt";
// Function to hash the password
export function hashPassword(plainPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const saltRounds = 10; // Number of salt rounds
            const hashedPassword = yield bcrypt.hash(plainPassword, saltRounds);
            return hashedPassword;
        }
        catch (err) {
            console.error("Error hashing password:", err);
            throw err;
        }
    });
}
export function addUser(username, email, plainPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hashedPassword = yield hashPassword(plainPassword); // Hash the password
            const newUser = new userModel({
                username,
                email,
                pass: hashedPassword, // Store the hashed password
            });
            yield newUser.save();
            return newUser;
        }
        catch (err) {
            throw new Error(`User creation failed: ${err.message}`);
        }
    });
}
export function viewUser() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield userModel.find(); // Fetch all users
            return users;
        }
        catch (err) {
            throw new Error(`User fetch failed: ${err.message}`);
        }
    });
}
export function updateUser(userId, userData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedUser = yield userModel.findByIdAndUpdate(userId, { $set: userData }, // Update only provided fields
            { new: true } // Return the updated document
            );
            return updatedUser;
        }
        catch (err) {
            throw new Error(`User update failed: ${err.message}`);
        }
    });
}

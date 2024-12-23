"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.addUser = addUser;
exports.viewUser = viewUser;
exports.updateUser = updateUser;
const model_user_1 = require("../model/model.user");
const bcrypt = __importStar(require("bcrypt"));
// Function to hash the password
function hashPassword(plainPassword) {
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
function addUser(username, email, plainPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hashedPassword = yield hashPassword(plainPassword); // Hash the password
            const newUser = new model_user_1.userModel({
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
function viewUser() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield model_user_1.userModel.find(); // Fetch all users
            return users;
        }
        catch (err) {
            throw new Error(`User fetch failed: ${err.message}`);
        }
    });
}
function updateUser(userId, userData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedUser = yield model_user_1.userModel.findByIdAndUpdate(userId, { $set: userData }, // Update only provided fields
            { new: true } // Return the updated document
            );
            return updatedUser;
        }
        catch (err) {
            throw new Error(`User update failed: ${err.message}`);
        }
    });
}

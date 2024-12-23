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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = exports.TaskStatus = exports.TaskPriority = void 0;
// import mongoose from 'mongoose';
const mongoose_1 = __importStar(require("mongoose"));
const TaskSchema = new mongoose_1.Schema({
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
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user", // Reference to the User model
        required: true,
    },
    updatedBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user", // Reference to the User model
    },
}, { timestamps: true }); // Automatically adds `createdAt` and `updatedAt`);
exports.TaskPriority = {
    HIGH: 1,
    MEDIUM: 2,
    LOW: 3,
};
exports.TaskStatus = {
    ONGOING: 1,
    DONE: 2,
};
exports.Task = mongoose_1.default.model("Task", TaskSchema);

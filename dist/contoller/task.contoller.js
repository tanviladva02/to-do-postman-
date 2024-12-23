"use strict";
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
exports.modifyTask = exports.viewTasks = exports.createTask = void 0;
const task_service_1 = require("../services/task.service");
const model_user_1 = require("../model/model.user");
console.log("usermodel", model_user_1.userModel);
class TaskNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "TaskNotFoundError";
    }
}
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { task, priority, status, createdBy } = req.body;
        // Check if createdBy is provided
        if (!createdBy) {
            return res.status(400).json({ msg: "User ID is required" });
        }
        // Find the user by ID
        const user = yield model_user_1.userModel.findById(createdBy);
        console.log("-----------", user);
        if (!user) {
            throw new Error("User not found!");
        }
        // Call service to add task
        const newTask = yield (0, task_service_1.addTask)(task, priority, status, user._id);
        console.log("User ID:", user._id); // This should print the ObjectId
        return res.status(200).json({ msg: "Task added successfully!", task: newTask });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Internal server error" });
    }
});
exports.createTask = createTask;
const viewTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status, archived, priority } = req.query;
        // If archived is passed as a query, convert it to a boolean
        const archivedFlag = archived !== undefined ? archived === "true" : null;
        // Fetch tasks based on query parameters
        const tasks = yield (0, task_service_1.getTasks)({
            status: status ? parseInt(status, 10) : null,
            archived: archivedFlag,
            priority: priority ? parseInt(priority, 10) : null,
        });
        return res.status(200).json({ msg: "tasks", tasks });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Internal server error" });
    }
});
exports.viewTasks = viewTasks;
const modifyTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.id;
        const { priority, status, archived, updatedBy } = req.body;
        // console.log("updated user id",updatedBy);
        const updatedTask = yield (0, task_service_1.updateTask)(taskId, {
            priority,
            status,
            archived,
            updatedBy
        });
        if (updatedTask) {
            return res
                .status(200)
                .json({ msg: "Task updated successfully!", task: updatedTask });
        }
        throw new Error("bad req");
    }
    catch (err) {
        console.error(err);
        if (err instanceof TaskNotFoundError) {
            return res.status(404).json({ msg: err.message });
        }
        // General error handling
        if (err instanceof Error) {
            return res.status(500).json({ msg: "Internal server error" });
        }
        return res.status(500).json({ msg: "Internal server error" });
    }
});
exports.modifyTask = modifyTask;

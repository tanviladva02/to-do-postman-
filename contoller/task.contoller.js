var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { addTask, getTasks, updateTask } from "../services/task.service.js";
import { userModel } from "../model/model.user.js";
class TaskNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "TaskNotFoundError";
    }
}
export const createTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { task, priority, status, createdBy } = req.body;
        if (!createdBy) {
            res.status(400).json({ msg: "User ID is required" });
            return;
        }
        const user = yield userModel.findById(createdBy);
        if (!user) {
            res.status(404).json({ msg: "User not found!" });
            return;
        }
        const newTask = yield addTask(task, priority, status, user._id);
        res.status(201).json({ msg: "Task added successfully!", task: newTask });
    }
    catch (err) {
        console.error(err);
        next(err);
    }
});
export const viewTasks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status, archived, priority } = req.query;
        const archivedFlag = archived !== undefined ? archived === "true" : null;
        const tasks = yield getTasks({
            status: status ? parseInt(status, 10) : null,
            archived: archivedFlag,
            priority: priority ? parseInt(priority, 10) : null,
        });
        res.status(200).json({ msg: "Tasks retrieved successfully", tasks });
    }
    catch (err) {
        console.error(err);
        next(err);
    }
});
export const modifyTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.id;
        const { priority, status, archived, updatedBy } = req.body;
        const updatedTask = yield updateTask(taskId, { priority, status, archived, updatedBy });
        if (!updatedTask) {
            res.status(404).json({ msg: "Task not found!" });
            return;
        }
        res.status(200).json({ msg: "Task updated successfully!", task: updatedTask });
    }
    catch (err) {
        console.error(err);
        if (err instanceof TaskNotFoundError) {
            res.status(404).json({ msg: err.message });
        }
        else {
            next(err);
        }
    }
});

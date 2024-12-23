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
exports.addTask = addTask;
exports.getTasks = getTasks;
exports.updateTask = updateTask;
// import { promises } from "dns";
const model_task_1 = require("../model/model.task");
function addTask(taskName_1) {
    return __awaiter(this, arguments, void 0, function* (taskName, priority = 3, status = 1, userId, createdBy) {
        try {
            const newTask = new model_task_1.Task({
                task: taskName,
                priority,
                status,
                archived: false, // by default tasks are not archived
                createdBy: userId
            });
            yield newTask.save(); // Save to MongoDB
            console.log("------", userId);
            return newTask;
        }
        catch (err) {
            throw new Error(`Task creation failed: ${err.message}`);
        }
    });
}
function getTasks(_a) {
    return __awaiter(this, arguments, void 0, function* ({ status = null, archived = null, priority = null, updatedBy, }) {
        try {
            const query = {};
            // Add filters for status and priority if provided
            if (status !== null)
                query.status = status;
            if (priority !== null)
                query.priority = priority;
            // Handle the archived field
            if (archived === null) {
                // If `archived` is not provided in the query, include both archived and non-archived tasks
            }
            else if (archived === true) {
                // If `archived=true`, include only archived tasks
                query.archived = true;
            }
            else if (archived === false) {
                // If `archived=false`, include only non-archived tasks
                query.archived = false;
            }
            // If status or priority filtering is applied, exclude archived tasks (if not specified)
            if ((status !== null || priority !== null) && archived === null) {
                query.archived = false; // Exclude archived tasks when filtering by status or priority
            }
            const tasks = yield model_task_1.Task.aggregate([
                { $match: query },
                {
                    $lookup: {
                        from: "users",
                        localField: "createdBy",
                        foreignField: "_id",
                        as: "createdByDetails",
                    },
                },
                { $unwind: "$createdByDetails" },
                {
                    $lookup: {
                        from: "users",
                        localField: "updatedBy",
                        foreignField: "_id",
                        as: "updatedByDetails",
                    },
                },
                { $unwind: { path: "$updatedByDetails", preserveNullAndEmptyArrays: true } },
            ]);
            return tasks;
        }
        catch (err) {
            throw new Error(`Failed to retrieve tasks: ${err.message}`);
        }
    });
}
function updateTask(id_1, _a) {
    return __awaiter(this, arguments, void 0, function* (id, { priority, status, archived, updatedBy }) {
        try {
            const updated = {};
            if (priority !== undefined)
                updated.priority = priority;
            if (status !== undefined)
                updated.status = status;
            if (archived !== undefined)
                updated.archived = archived;
            if (updatedBy !== undefined)
                updated.updatedBy = updatedBy;
            const updatedTask = yield model_task_1.Task.findByIdAndUpdate(id, updated, { new: true });
            if (!updatedTask) {
                throw new Error("Task not found!");
            }
            return updatedTask;
        }
        catch (err) {
            throw new Error(`Task update failed: ${err.message}`);
        }
    });
}

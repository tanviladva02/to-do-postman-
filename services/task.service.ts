import { Task } from "../model/model.task.js";
import { ObjectId } from "mongoose";
import { ITask } from "../model/model.task.js";

// Define the interface for task query parameters
interface TaskQueryParams {
    status?: number | null;
    archived?: boolean | null;
    priority?: number | null;
    updatedBy?: ObjectId | string;
}

// Define the interface for task update parameters
interface TaskUpdateParams {
priority?: number;
status?: number;
archived?: boolean;
updatedBy?: ObjectId | string;
}

export async function addTask(taskName:String, priority:number = 3, status:number = 1 , userId:ObjectId | string,createdBy?: ObjectId | string):Promise<ITask> {
    try {     
        const newTask = new Task({
            task: taskName,
            priority,
            status,
            archived: false, // by default tasks are not archived
            createdBy:userId
        });
        await newTask.save(); // Save to MongoDB
        return newTask;
    } catch (err:any) {
        throw new Error(`Task creation failed: ${err.message}`);
    }
}

export async function getTasks({ status = null, archived = null, priority = null,updatedBy, }:TaskQueryParams):Promise<any[]> {
    try {
        const query:any = {};

        // Add filters for status and priority if provided
        if (status !== null) query.status = status;
        if (priority !== null) query.priority = priority;

        // Handle the archived field
        if (archived === null) {
            // If `archived` is not provided in the query, include both archived and non-archived 
        } else if (archived === true) {  // If `archived=true`, include only archived tasks
            query.archived = true;
        } else if (archived === false) {  // If `archived=false`, include only non-archived tasks
            query.archived = false;
        }

        // If status or priority filtering is applied, exclude archived tasks (if not specified)
        if ((status !== null || priority !== null) && archived === null) {
            query.archived = false; // Exclude archived tasks when filtering by status or priority
        }

        const tasks = await Task.aggregate([
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

    } catch (err:any) {
        throw new Error(`Failed to retrieve tasks: ${err.message}`);
    }
}

export async function updateTask(id:string, { priority, status, archived, updatedBy }:TaskUpdateParams):Promise<ITask | null> {
    try {
        const updated :Partial<TaskUpdateParams> = {};
        if (priority !== undefined) updated.priority = priority;
        if (status !== undefined) updated.status = status;
        if (archived !== undefined) updated.archived = archived;
        if (updatedBy !== undefined) updated.updatedBy = updatedBy;

        const updatedTask = await Task.findByIdAndUpdate(id, updated, { new: true });
        if (!updatedTask) {
            throw new Error("Task not found!");
        }
        return updatedTask;
    } catch (err:any) {
        throw new Error(`Task update failed: ${err.message}`);
    }
}


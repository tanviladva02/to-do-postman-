const { Task } = require("../model/model.task");


async function addTask(taskName, priority = 3, status = 1 , userId,createdBy) {
    try {     
        const newTask = new Task({
            task: taskName,
            priority,
            status,
            archived: false, // by default tasks are not archived
            createdBy:userId
        });
        await newTask.save(); // Save to MongoDB
        console.log("------",userId);
        return newTask;
    } catch (err) {
        throw new Error(`Task creation failed: ${err.message}`);
    }
}

async function getTasks({ status = null, archived = null, priority = null,updatedBy }) {
    try {
        const query = {};

        // Add filters for status and priority if provided
        if (status !== null) query.status = status;
        if (priority !== null) query.priority = priority;

        // Handle the archived field
        if (archived === null) {
            // If `archived` is not provided in the query, include both archived and non-archived tasks
        } else if (archived === true) {
            // If `archived=true`, include only archived tasks
            query.archived = true;
        } else if (archived === false) {
            // If `archived=false`, include only non-archived tasks
            query.archived = false;
        }

        // If status or priority filtering is applied, exclude archived tasks (if not specified)
        if ((status !== null || priority !== null) && archived === null) {
            query.archived = false; // Exclude archived tasks when filtering by status or priority
        }

        // Fetch tasks from MongoDB based on the query
        const tasks = await Task.find(query)
            .populate("createdBy", "username email pass") // Fetch user details for createdBy
            .populate("updatedBy", "username email pass"); // Fetch user details for updatedBy
        return tasks;
    } catch (err) {
        throw new Error(`Failed to retrieve tasks: ${err.message}`);
    }
}

async function updateTask(id, { priority, status, archived, updatedBy }) {
    try {
        const updated = {};
        if (priority) updated.priority = priority;
        if (status) updated.status = status;
        if (archived !== undefined) updated.archived = archived;
        if (updatedBy) updated.updatedBy = updatedBy;

        const updatedTask = await Task.findByIdAndUpdate(id, updated, { new: true });
        if (!updatedTask) {
            throw new Error("Task not found!");
        }
        return updatedTask;
    } catch (err) {
        throw new Error(`Task update failed: ${err.message}`);
    }
}

module.exports = {
    addTask,
    getTasks,
    updateTask
};

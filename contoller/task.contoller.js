const { addTask, getTasks, updateTask } = require("../services/task.service");

const createTask = async (req, res) => {
    try {
        const { task, priority, status } = req.body;

        // Call service to add task
        const newTask = await addTask(task, priority, status);
        return res.status(200).json({ msg: "Task added successfully!", task: newTask });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

const viewTasks = async (req, res) => {
    try {
        const { status, archived, priority } = req.query;

        // If archived is passed as a query, convert it to a boolean
        const archivedFlag = archived !== undefined ? archived === "true" : null;

        // Fetch tasks based on query parameters
        const tasks = await getTasks({
            status: status ? parseInt(status) : null,
            archived: archivedFlag,
            priority: priority ? parseInt(priority) : null,
        });

        // Check if tasks array is empty
        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ msg: "No tasks found" });
        }

        return res.status(200).json({ tasks });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Internal server error" });
    }
};


const modifyTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const { priority, status, archived } = req.body;

        const updatedTask = await updateTask(taskId, { priority, status, archived });

        if (updatedTask) {
            return res.status(200).json({ msg: "Task updated successfully!", task: updatedTask });
        }

        throw new Error("Task not found!");
    } catch (err) {
        console.error(err);
        if (err.message === "Task not found!") {
            return res.status(404).json({ msg: err.message });
        }
        return res.status(500).json({ msg: "Internal server error" });
    }
};

module.exports = {
    createTask,
    viewTasks,
    modifyTask,
};

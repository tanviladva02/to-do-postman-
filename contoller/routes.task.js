const express = require("express");
const taskRoutes = express.Router();
const { TaskPriority, TaskStatus, addTask, getTasks, updateTask } = require("../model/model.task");

// 1. Add Task API
taskRoutes.post("/addTask", (req, res) => {
    try {
        const { task, priority = TaskPriority.LOW, status = TaskStatus.ONGOING } = req.body;

        if (![TaskPriority.HIGH, TaskPriority.MEDIUM, TaskPriority.LOW].includes(priority)) {
            return res.status(400).json({ msg: "Invalid priority value!" });
        }
        if (![TaskStatus.ONGOING, TaskStatus.DONE].includes(status)) {
            return res.status(400).json({ msg: "Invalid status value!" });
        }

        const newTask = addTask(task, priority, status);
        return res.status(200).json({ msg: "Task added successfully!", task: newTask });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Internal server error" });
    }
});

// 2. View Tasks API
taskRoutes.get("/viewTasks", (req, res) => {
    try {
        const { status, archived, priority } = req.query;

        const tasks = getTasks({
            status: status ? parseInt(status) : null,
            archived: archived !== undefined ? archived === "true" : null,
            priority: priority ? parseInt(priority) : null,
        });

        return res.status(200).json({ tasks });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Internal server error" });
    }
});

// 3. Update Task API
taskRoutes.put("/updateTask/:id", (req, res) => {
    try {
        const taskId = parseInt(req.params.id);
        const { priority, status, archived } = req.body;

        const updatedTask = updateTask(taskId, { priority, status, archived });

        if (updatedTask) {
            return res.status(200).json({ msg: "Task updated successfully!", task: updatedTask });
        }

        return res.status(404).json({ msg: "Task not found!" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Internal server error" });
    }
});

module.exports = taskRoutes;

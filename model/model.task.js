const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
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
    updates: {
        type: Array,
        default: [],
    },
}, { timestamps: true });  // Automatically adds `createdAt` and `updatedAt`);

const Task = mongoose.model("Task", TaskSchema);

const TaskPriority = {
    HIGH: 1,
    MEDIUM: 2,
    LOW: 3,
};

const TaskStatus = {
    ONGOING: 1,
    DONE: 2,
};

module.exports = {
    Task,
    TaskPriority,
    TaskStatus,
};

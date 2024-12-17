let taskList = []; // Active tasks array
let archivedTasks = []; // Archived tasks array
let idCounter = 1; // Incremental task ID

// Enum for priority and status
const TaskPriority = {
    HIGH: 1,
    MEDIUM: 2,
    LOW: 3,
};

const TaskStatus = {
    ONGOING: 1,
    DONE: 2,
};

// Function to add a new task
function addTask(taskName, priority = TaskPriority.LOW, status = TaskStatus.ONGOING) {
    const newTask = {
        id: idCounter++,
        task: taskName,
        priority: priority,
        status: status,
        archived: false,
        updates: [],
    };
    taskList.push(newTask);
    return newTask;
}

// Function to get tasks with optional filters
function getTasks({ status = null, archived = null, priority = null }) {
    let tasksToShow = [...taskList, ...archivedTasks]; // Include all tasks by default

    // If any filter is applied, exclude archived tasks unless specified
    if (status !== null || priority !== null || archived === false) {
        tasksToShow = taskList;
    }

    // Filter tasks
    if (archived !== null) {
        tasksToShow = tasksToShow.filter(task => task.archived === archived);
    }

    if (status !== null) {
        tasksToShow = tasksToShow.filter(task => task.status === status);
    }

    if (priority !== null) {
        tasksToShow = tasksToShow.filter(task => task.priority === priority);
    }

    return tasksToShow;
}

// Function to update a task
function updateTask(id, { priority, status, archived }) {
    // Check in taskList
    let taskIndex = taskList.findIndex(t => t.id === id);
    if (taskIndex !== -1) {
        let task = taskList[taskIndex];

        // Update values if provided
        if (priority && [TaskPriority.HIGH, TaskPriority.MEDIUM, TaskPriority.LOW].includes(priority)) {
            task.priority = priority;
        }
        if (status && [TaskStatus.ONGOING, TaskStatus.DONE].includes(status)) {
            task.status = status;
        }
        if (archived !== undefined && archived === true) {
            task.archived = true;
            archivedTasks.push(task);
            taskList.splice(taskIndex, 1); // Remove from active tasks
        }

        task.updates.push({ priority, status, archived });
        return task;
    }

    // Check in archivedTasks if restoring
    let archivedTaskIndex = archivedTasks.findIndex(t => t.id === id);
    if (archivedTaskIndex !== -1) {
        let task = archivedTasks[archivedTaskIndex];
        if (archived === false) {
            task.archived = false;
            taskList.push(task);
            archivedTasks.splice(archivedTaskIndex, 1);
        }
        return task;
    }

    return null; // Task not found
}

// Export functions and enums
module.exports = {
    TaskPriority,
    TaskStatus,
    addTask,
    getTasks,
    updateTask,
};

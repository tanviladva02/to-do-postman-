const { addTask, getTasks, updateTask  } = require("../services/task.service");
const userModel  = require("../model/model.user");

const createTask = async (req, res) => {
  try {
    const { task, priority, status, createdBy } = req.body;

    // Check if createdBy is provided
    if (!createdBy) {
      return res.status(400).json({ msg: "User ID is required" });
    }

    // Find the user by ID
    const user = await userModel.findById(createdBy);
    if (!user) {
      throw new Error("User not found!");
    }

    // Call service to add task
    const newTask = await addTask(task, priority, status, user);
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

    return res.status(200).json({ msg: "tasks", tasks });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

const modifyTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { priority, status, archived , updatedBy } = req.body;
    // console.log("updated user id",updatedBy);

    const updatedTask = await updateTask(taskId, {
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

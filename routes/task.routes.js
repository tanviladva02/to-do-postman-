const express = require("express");
const router = express.Router();
const { createTask, viewTasks, modifyTask } = require("../contoller/task.contoller"); // Import the functions from the controller

router.post("/addTask", createTask); // Create addTask API
router.get("/viewTasks", viewTasks); // Create viewTasks API
router.put("/updateTask/:id", modifyTask); // Create updateTask API

module.exports = router;

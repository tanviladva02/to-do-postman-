"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_contoller_1 = require("../contoller/task.contoller");
const router = (0, express_1.Router)(); // Type explicitly as Router
// Define your routes
router.post('/addTask', task_contoller_1.createTask);
router.get('/viewTasks', task_contoller_1.viewTasks);
router.put('/updateTask/:id', task_contoller_1.modifyTask);
exports.default = router;

import { Router } from 'express';
import { createTask, viewTasks, modifyTask } from '../contoller/task.contoller.js';

const router: Router = Router(); // Type explicitly as Router

// Define your routes
router.post('/addTask', createTask);
router.get('/viewTasks', viewTasks);
router.put('/updateTask/:id', modifyTask);

export default router;
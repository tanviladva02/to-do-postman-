import { Request, Response, NextFunction } from 'express';
import { addTask, getTasks, updateTask } from "../services/task.service.js";
import { userModel } from "../model/model.user.js";
import { ObjectId } from "mongoose";

interface CreateTaskRequestBody {
  task: string;
  priority?: number;
  status?: number;
  createdBy: string; // Assuming createdBy is a string (could be ObjectId or string depending on your model)
}

class TaskNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TaskNotFoundError";
  }
}

export const createTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { task, priority, status, createdBy } = req.body as CreateTaskRequestBody;

    if (!createdBy) {
      res.status(400).json({ msg: "User ID is required" });
      return;
    }

    const user = await userModel.findById(createdBy);
    if (!user) {
      res.status(404).json({ msg: "User not found!" });
      return;
    }

    const newTask = await addTask(task, priority, status, user._id as string | ObjectId);
    res.status(201).json({ msg: "Task added successfully!", task: newTask });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const viewTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { status, archived, priority } = req.query;

    const archivedFlag = archived !== undefined ? archived === "true" : null;

    const tasks = await getTasks({
      status: status ? parseInt(status as string, 10) : null,
      archived: archivedFlag,
      priority: priority ? parseInt(priority as string, 10) : null,
    });

    res.status(200).json({ msg: "Tasks retrieved successfully", tasks });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const modifyTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const taskId = req.params.id;
    const { priority, status, archived, updatedBy } = req.body;

    const updatedTask = await updateTask(taskId, { priority, status, archived, updatedBy });

    if (!updatedTask) {
      res.status(404).json({ msg: "Task not found!" });
      return;
    }

    res.status(200).json({ msg: "Task updated successfully!", task: updatedTask });
  } catch (err) {
    console.error(err);

    if (err instanceof TaskNotFoundError) {
      res.status(404).json({ msg: err.message });
    } else {
      next(err);
    }
  }
};
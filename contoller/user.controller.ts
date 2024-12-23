import { Request, Response, NextFunction } from "express";
import { addUser, viewUser, updateUser } from "../services/user.service.js";

export const user = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { username, email, pass } = req.body;

    const userDetail = await addUser(username, email, pass);
    res.status(201).json({ msg: "User added successfully!", userDetail });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await viewUser();
    if (!users || users.length === 0) {
      res.status(404).json({ msg: "No users found" });
      return;
    }
    res.status(200).json({ msg: "Users fetched successfully!", data: users });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const updateUserDetails = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId } = req.params; // User ID from route
    const { username, email, pass } = req.body; // New user data

    const updatedUser = await updateUser(userId, { username, email, pass });
    if (!updatedUser) {
      res.status(404).json({ msg: "User not found" });
      return;
    }

    res.status(200).json({ msg: "User updated successfully!", data: updatedUser });
  } catch (err) {
    console.error(err);
    next(err);
  }
};




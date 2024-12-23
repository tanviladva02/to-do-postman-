import { Router } from 'express';
import { user, getUser, updateUserDetails } from '../contoller/user.controller.js';
const router = Router();
router.post("/addUser", user); // Add new user
router.get("/viewUser", getUser); // Fetch all users
router.put("/updateUser/:userId", updateUserDetails); // Update user by ID
export default router;

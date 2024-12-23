"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../contoller/user.controller");
const router = (0, express_1.Router)();
router.post("/addUser", user_controller_1.user); // Add new user
router.get("/viewUser", user_controller_1.getUser); // Fetch all users
router.put("/updateUser/:userId", user_controller_1.updateUserDetails); // Update user by ID
exports.default = router;
